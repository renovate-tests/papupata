import { Request, Response, RequestHandler, IRouter, Application } from 'express'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import fromPairs from 'lodash/fromPairs'
import qs from 'qs'

// This type is used in failure cases to give a better error message, technically it could just be replaced with "never"
type DeclareRoutePartsAsConstArraysPlease = { 'must-be-const': never }

export type TypedRequest<RequestBaseType, Params, Query, Body> = Omit<RequestBaseType, 'params' | 'query' | 'body'> & {
  params: Params
  query: Query
  body: Body
}

type PapupataMiddleware<RequestType, RouteOptions> = (
  req: RequestType,
  res: Response,
  route: { options: RouteOptions },
  next: () => Promise<any>
) => Promise<any>

type Middleware = RequestHandler
export type MakeRequestAdapter<RequestOptions = void> = (
  method: string,
  url: string,
  query: any,
  body: any,
  params: any,
  route: any,
  requestOptions?: RequestOptions
) => Promise<any>

interface Config<RequestOptions = void, RouteOptions = void, RequestType = Request> {
  baseURL?: string
  makeRequest?: MakeRequestAdapter<RequestOptions>
  router?: IRouter<any>
  routerAt?: string
  app?: Application
  treatUndefinedAs204?: boolean
  inherentMiddleware?: Array<PapupataMiddleware<RequestType, RouteOptions>>
}

type StringTupleElementTypes<T extends readonly string[]> = T extends ReadonlyArray<infer U> ? U : never

export class APIDeclaration<RequestType = Request, RouteOptions = void, RequestOptions = void> {
  private config: Config<RequestOptions, RouteOptions, RequestType> | null = null
  public __apis: Array<{ unmock(): void }> = []
  public configure(config: Config<RequestOptions, RouteOptions, RequestType> | null) {
    if (config && config.router && config.app) throw new Error('Config should only have app or router, not both')
    this.config = config
  }

  public declareGetAPI(path: string, routeOptions?: RouteOptions) {
    return declareAPI<RequestType, RouteOptions, RequestOptions>(this, 'get', path, routeOptions)
  }

  public declarePostAPI(path: string, routeOptions?: RouteOptions) {
    return declareAPI<RequestType, RouteOptions, RequestOptions>(this, 'post', path, routeOptions)
  }

  public declarePutAPI(path: string, routeOptions?: RouteOptions) {
    return declareAPI<RequestType, RouteOptions, RequestOptions>(this, 'put', path, routeOptions)
  }

  public declarePatchAPI(path: string, routeOptions?: RouteOptions) {
    return declareAPI<RequestType, RouteOptions, RequestOptions>(this, 'patch', path, routeOptions)
  }

  public declareDeleteAPI(path: string, routeOptions?: RouteOptions) {
    return declareAPI<RequestType, RouteOptions, RequestOptions>(this, 'delete', path, routeOptions)
  }

  public getConfig() {
    return this.config
  }

  public getDeclaredAPIs() {
    return [...this.__apis]
  }

  public unmockAll() {
    for (const api of this.__apis) {
      api.unmock()
    }
  }
}

const paramMatchers = (params: readonly string[]) =>
  params.map(param => ({
    name: param,
    matcher: new RegExp(`(^|/):${param}($|/)`),
  }))

function declareAPI<RequestType, RouteOptions, RequestOptions>(
  parent: APIDeclaration<RequestType, RouteOptions, RequestOptions>,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  path: string,
  routeOptions?: RouteOptions
) {
  function params() {
    return <PT extends readonly string[]>(params: PT) => {
      const q = query(params)
      return {
        query: q,
        ...q([] as const),
      }
    }
  }
  function query<PT extends readonly string[]>(params: PT) {
    return <QT extends readonly string[]>(query: QT) => {
      const oq = optionalQuery(params, query)
      return {
        optionalQuery: oq,
        ...oq([] as const),
      }
    }
  }
  function optionalQuery<PT extends readonly string[], QT extends readonly string[]>(params: PT, query: QT) {
    return <OQT extends readonly string[]>(optionalQuery: OQT) => {
      const qb = queryBool(params, query, optionalQuery)
      return {
        queryBool: qb,
        ...qb([] as const),
      }
    }
  }
  function queryBool<PT extends readonly string[], QT extends readonly string[], OQT extends readonly string[]>(
    params: PT,
    query: QT,
    optionalQuery: OQT
  ) {
    return <BQT extends readonly string[]>(queryBool: BQT) => {
      const b = body(params, query, optionalQuery, queryBool)
      return {
        body: b,
        ...b<{}>(),
      }
    }
  }

  function body<
    PT extends readonly string[],
    QT extends readonly string[],
    OQT extends readonly string[],
    BQT extends readonly string[]
  >(params: PT, query: QT, optionalQuery: OQT, boolQuery: BQT) {
    return <BT>() => {
      const resp = responder(params, query, optionalQuery, boolQuery, (null as any) as BT)
      return { ...resp }
    }
  }

  return {
    params: params(),
    ...params()([] as const),
  }
  function responder<
    ParamsType extends readonly string[],
    QueryType extends readonly string[],
    OptionalQueryType extends readonly string[],
    BoolQueryType extends readonly string[],
    BodyType
  >(
    params: ParamsType,
    query: QueryType,
    optionalQuery: OptionalQueryType,
    boolQuery: BoolQueryType,
    _bodyPlaceholder: BodyType
  ) {
    type CallArgsWithoutBody = ActualTypeMap<StringTupleElementTypes<ParamsType>, string> &
      ActualTypeMap<StringTupleElementTypes<QueryType>, string> &
      ActualOptionalTypeMap<StringTupleElementTypes<OptionalQueryType>, string> &
      ActualTypeMap<StringTupleElementTypes<BoolQueryType>, boolean>
    type CallArgs = BodyType & CallArgsWithoutBody

    type CallArgParam = {} extends CallArgs
      ? [] | [CallArgs] | [CallArgs, RequestOptions]
      :
          | [CallArgs]
          | [CallArgs, RequestOptions]
          | [BodyType, CallArgsWithoutBody]
          | [BodyType, CallArgsWithoutBody, RequestOptions]

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
              return Promise.resolve(mockImpl.mockFn(args))
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
        call.getURL = getURL
        call.unmock = unmock
        call.mock = mock
        call.mockOnce = mockOnce
        call.options = routeOptions
        call.apiUrlParameters = {
          params,
          query,
          optionalQuery,
          boolQuery,
        }

        function implement(impl: ImplFn) {
          return implementWithMiddleware([], impl)
        }

        function implementWithMiddleware(middleware: Middleware[], impl: ImplFn) {
          ;(call as any).implementation = impl
          const config = parent.getConfig()
          if (!config) throw new Error('Papupata not configured')
          const host = config.router || config.app
          if (!host) throw new Error('Papupata: neither router nor app configured, cannot implement routes')
          if (config.routerAt && !path.startsWith(config.routerAt)) {
            throw new Error('Papupata: when routerAt is provided, all routes must be its children.')
          }
          const strippedPath = config.routerAt ? path.substring(config.routerAt.length) : path

          host[method](strippedPath, ...middleware, async (req, res, next) => {
            try {
              for (const bq of boolQuery) {
                req.query[bq] = req.query[bq] === 'true'
              }
              async function getImplVal() {
                const unmappedValue = await impl(req as any, res)
                return mapper ? await mapper(unmappedValue) : unmappedValue
              }
              const value = await runHandlerChain(
                config.inherentMiddleware ? [...config.inherentMiddleware, getImplVal] : [getImplVal],
                req,
                res,
                call
              )
              if (value !== undefined) {
                res.send(value)
              } else if (config.treatUndefinedAs204) {
                res.status(204)
                res.send()
              }
            } catch (err) {
              next(err)
            }
          })
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
          implement: (impl: ImplFn) => void
          implementation?: ImplFn
          implementWithMiddleware: (middleware: Middleware[], impl: ImplFn) => void
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
}

type ActualTypeMap<TKeys extends string, TValues> = {
  [key in TKeys]: string extends TKeys ? DeclareRoutePartsAsConstArraysPlease : TValues
}

type ActualOptionalTypeMap<TKeys extends string, TValues> = {
  [key in TKeys]?: string extends TKeys ? DeclareRoutePartsAsConstArraysPlease : TValues
}

async function runHandlerChain(
  handlers: Array<PapupataMiddleware<any, any>>,
  req: any,
  res: any,
  route: any
): Promise<any> {
  const [first, ...rest] = handlers
  if (!first) return undefined
  return first(req, res, route, () => runHandlerChain(rest, req, res, route))
}
