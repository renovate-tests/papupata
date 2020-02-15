import { ActualOptionalTypeMap, ActualTypeMap, Method, StringTupleElementTypes } from './types'
import { IAPIDeclaration, TypedRequest } from './index'
import { RequestHandler, Response, Application, Router } from 'express'
import pick from 'lodash/pick'
import fromPairs from 'lodash/fromPairs'
import omit from 'lodash/omit'
import qs from 'qs'
import { paramMatchers } from './utils/paramMatchers'
import { runHandlerChain } from './utils/runHandlerChain'
import runExpressMiddleware from './runExpressMiddleware'
import { PapupataMiddleware } from './config'

export function responder<
  ParamsType extends readonly string[],
  QueryType extends readonly string[],
  OptionalQueryType extends readonly string[],
  BoolQueryType extends readonly string[],
  BodyType,
  BodyInputType,
  RequestOptions,
  RequestType,
  RouteOptions
>(
  params: ParamsType,
  query: QueryType,
  optionalQuery: OptionalQueryType,
  boolQuery: BoolQueryType,
  _bodyPlaceholder: BodyType,
  _bodyPlaceholder2: BodyInputType,
  method: Method,
  path: string,
  parent: IAPIDeclaration<RequestType, RouteOptions, RequestOptions>,
  routeOptions: RouteOptions
) {
  type CallArgsWithoutBody = ActualTypeMap<StringTupleElementTypes<ParamsType>, string> &
    ActualTypeMap<StringTupleElementTypes<QueryType>, string> &
    ActualOptionalTypeMap<StringTupleElementTypes<OptionalQueryType>, string> &
    ActualTypeMap<StringTupleElementTypes<BoolQueryType>, boolean>
  type CallArgs = BodyInputType & CallArgsWithoutBody

  type CallArgParam = {} extends CallArgs
    ? [] | [CallArgs] | [CallArgs, RequestOptions]
    :
        | [CallArgs]
        | [CallArgs, RequestOptions]
        | [BodyInputType, CallArgsWithoutBody]
        | [BodyInputType, CallArgsWithoutBody, RequestOptions]

  return {
    response<ResponseType, ResponseTypeOnServer = ResponseType>(
      mapper?: (payload: ResponseTypeOnServer) => ResponseType | Promise<ResponseType>
    ) {
      type ActualRequestType = TypedRequest<
        RequestType,
        ActualTypeMap<StringTupleElementTypes<ParamsType>, string>,
        ActualTypeMap<StringTupleElementTypes<QueryType>, string> &
          ActualOptionalTypeMap<StringTupleElementTypes<OptionalQueryType>, string> &
          ActualTypeMap<StringTupleElementTypes<BoolQueryType>, boolean>,
        BodyType
      >
      type ImplFn = (req: ActualRequestType, res: Response) => Promise<ResponseTypeOnServer> | ResponseTypeOnServer

      type MockFn = (args: CallArgs, body?: BodyType) => ResponseType | Promise<ResponseType>
      type Mock = ResponseType | ((args: CallArgs) => ResponseType | Promise<ResponseType>)
      type MiddlewareContainer = {
        express?: RequestHandler[]
        papupata?: Array<PapupataMiddleware<RequestType, RouteOptions>>
      }

      interface ActiveMock {
        mockFn: MockFn
        includeBodySeparately?: boolean
      }

      let mockImpl: ActiveMock | null = null

      function call(...argsArr: CallArgParam): Promise<ResponseType> {
        const separateBody =
          typeof argsArr[0] !== 'object' ||
          argsArr.length > 2 ||
          (argsArr.length === 2 && isValidAsNonBodyRequestData(argsArr[1]))

        const hasOtherArgs = separateBody && isValidAsNonBodyRequestData(argsArr[1]),
          args = hasOtherArgs ? argsArr[1] : separateBody ? {} : (argsArr[0] as any)

        const requestOptions = separateBody && hasOtherArgs ? argsArr[2] : (argsArr[1] as any)

        const reqParams = pick(args, params),
          reqQuery = {
            ...pick(args, query),
            ...pick(args, optionalQuery),
            ...fromPairs(boolQuery.map(key => [key, (!!(args as any)[key]).toString()])),
          },
          reqBody = separateBody ? argsArr[0] : omit(args, [...params, ...query, ...boolQuery, ...optionalQuery])

        if (mockImpl) {
          if (!mockImpl.includeBodySeparately) {
            return Promise.resolve(
              separateBody ? mockImpl.mockFn({ ...args, ...(reqBody || {}) }) : mockImpl.mockFn(args)
            )
          }
          if (separateBody) {
            if (typeof reqBody === 'object') {
              return Promise.resolve(mockImpl.mockFn({ ...args, ...reqBody }, reqBody as any))
            } else {
              return Promise.resolve(mockImpl.mockFn(args, reqBody as any))
            }
          } else {
            return Promise.resolve(mockImpl.mockFn(args, reqBody as any))
          }
        }

        const config = parent.getConfig()
        if (!config || !config.makeRequest) throw new Error('Request adapter not configured')

        const pathWithParams = getURL(reqParams as any)

        return config.makeRequest(method, pathWithParams, reqQuery, reqBody, reqParams, call, requestOptions)
      }

      function isValidAsNonBodyRequestData(obj: any) {
        if (typeof obj !== 'object') return false
        const validKeys = [...query, ...optionalQuery, ...boolQuery, ...params]
        return Object.keys(obj).every(key => validKeys.includes(key))
      }

      function unmock() {
        mockImpl = null
      }

      function mock(mockFnOrValue: Mock, options: Omit<ActiveMock, 'mockFn'> = {}) {
        mockImpl = {
          ...options,
          mockFn: typeof mockFnOrValue === 'function' ? (mockFnOrValue as any) : () => mockFnOrValue,
        }
      }

      function mockOnce(mockFnOrValue: Mock, options: Omit<ActiveMock, 'mockFn'> = {}) {
        mockImpl = {
          ...options,
          mockFn: args => {
            unmock()
            return typeof mockFnOrValue === 'function' ? (mockFnOrValue as any)(args) : mockFnOrValue
          },
        }
      }

      call.implement = implement
      call.implementWithMiddleware = implementWithMiddleware
      call.implementWithExpressMiddleware = implementWithMiddleware
      call.implementWithPapupataMiddleware = implementWithPapupataMiddleware
      call.getURL = getURL
      call.unmock = unmock
      call.mock = mock
      call.mockOnce = mockOnce
      call.options = routeOptions
      call.apiDeclaration = parent
      call.method = method
      call.apiUrlParameters = {
        params,
        query,
        optionalQuery,
        boolQuery,
      }
      call.implementation = undefined as any
      call.implementationMiddleware = {} as MiddlewareContainer

      let expressHost: undefined | Application | Router
      const config = parent.getConfig()
      if (config?.autoImplementAllAPIs && (config.router || config.app)) {
        implement(null)
      }

      function implement(impl: ImplFn | null) {
        return implementWithMiddleware({}, impl)
      }

      function implementWithPapupataMiddleware(
        middleware: NonNullable<MiddlewareContainer['papupata']>,
        impl: ImplFn | null
      ) {
        return implementWithMiddleware({ papupata: middleware }, impl)
      }

      function implementWithMiddleware(middleware: RequestHandler[] | MiddlewareContainer, impl: ImplFn | null) {
        call.implementation = impl
        call.implementationMiddleware = Array.isArray(middleware) ? { express: middleware } : middleware
        const config = parent.getConfig()
        if (!config) throw new Error('Papupata not configured')
        const host = config.router || config.app
        if (!host) {
          if (config.autoImplementAllAPIs) return
          throw new Error('Papupata: neither router nor app configured, cannot implement routes')
        }
        if (config.routerAt && !path.startsWith(config.routerAt)) {
          throw new Error('Papupata: when routerAt is provided, all routes must be its children.')
        }
        if (expressHost === host) {
          return
        }
        const strippedPath = config.routerAt ? path.substring(config.routerAt.length) : path

        host[method](strippedPath, async (req, res, next) => {
          const impl = call.implementation

          try {
            const { express: expressMiddleware } = call.implementationMiddleware
            if (expressMiddleware) {
              await runExpressMiddleware(expressMiddleware, req, res)
            }
          } catch (error) {
            return next(error)
          }

          if (!impl) {
            if (parent.getConfig()?.autoImplementAllAPIs) {
              res.status(501)
              res.send('Not implemented')
            } else {
              return next()
            }
            return
          }
          try {
            for (const bq of boolQuery) {
              req.query[bq] = req.query[bq] === 'true'
            }
            async function getImplVal() {
              const unmappedValue = await impl(req as any, res)
              return mapper ? await mapper(unmappedValue) : unmappedValue
            }
            const value = await runHandlerChain(
              [...(config.inherentMiddleware || []), ...(call.implementationMiddleware.papupata || []), getImplVal],
              req,
              res,
              call
            )
            if (value !== undefined) {
              res.send(value)
            } else if (config.treatUndefinedAs204) {
              // TODO: only do so if there is no explicit status
              res.status(204)
              res.send()
            }
          } catch (err) {
            next(err)
          }
        })
        expressHost = host
      }

      function getURL(
        pathParamsAndQueryParams:
          | ActualTypeMap<StringTupleElementTypes<ParamsType>, string>
          | (ActualTypeMap<StringTupleElementTypes<ParamsType>, string> &
              ActualTypeMap<StringTupleElementTypes<QueryType>, string> &
              ActualOptionalTypeMap<StringTupleElementTypes<OptionalQueryType>, string> &
              ActualTypeMap<StringTupleElementTypes<BoolQueryType>, boolean>)
      ) {
        const config = parent.getConfig()
        if (!config) throw new Error('Papupata not configured')
        if (config.baseURL === undefined) throw new Error('Cannot get URL of a route with base URL not set up')
        return config.baseURL + applyPathParams(pathParamsAndQueryParams)
      }

      parent.__apis.push(call)

      // Typescript is fine without this explicit typing here, but idea's autocomplete does not work without it
      return call as {
        (...argsArr: CallArgParam): Promise<ResponseType>
        implement: (impl: ImplFn | null) => void
        implementation?: ImplFn
        implementationMiddleware?: MiddlewareContainer
        /** @deprecated */
        implementWithMiddleware: (
          middleware:
            | RequestHandler[]
            | { express: RequestHandler[]; papupata?: Array<PapupataMiddleware<RequestType, RouteOptions>> },
          impl: ImplFn
        ) => void
        implementWithExpressMiddleware: (middleware: RequestHandler[], impl: ImplFn) => void
        implementWithPapupataMiddleware: (
          middleware: Array<PapupataMiddleware<RequestType, RouteOptions>>,
          impl: ImplFn
        ) => void
        getURL: (
          pathParams:
            | ActualTypeMap<StringTupleElementTypes<ParamsType>, string>
            | (ActualTypeMap<StringTupleElementTypes<ParamsType>, string> &
                ActualTypeMap<StringTupleElementTypes<QueryType>, string> &
                ActualOptionalTypeMap<StringTupleElementTypes<OptionalQueryType>, string> &
                ActualTypeMap<StringTupleElementTypes<BoolQueryType>, boolean>)
        ) => string
        ResponseType: ResponseType
        ServerResponseType: ResponseTypeOnServer
        BodyType: BodyType
        CallArgsType: CallArgs
        RequestType: ActualRequestType
        mockOnce: (fn: Mock) => void
        mock: (fn: Mock) => void
        unmock: () => void
        options?: RouteOptions
        apiUrlParameters: {
          params: ParamsType
          query: QueryType
          optionalQuery: OptionalQueryType
          boolQuery: BoolQueryType
        }
        method: Method
        apiDeclaration: any
      }

      function applyPathParams(reqParams: ActualTypeMap<StringTupleElementTypes<ParamsType>, string>) {
        const pathWithParams = paramMatchers(params).reduce((currPath, { matcher, name }) => {
          return currPath.replace(matcher, (_, before, after) => {
            return `${before}${encodeURIComponent((reqParams as any)[name])}${after}`
          })
        }, path)

        const queryParams = omit(reqParams, [...params])
        if (Object.keys(queryParams).length) {
          return pathWithParams + '?' + qs.stringify(queryParams)
        } else {
          return pathWithParams
        }
      }
    },
  }
}
