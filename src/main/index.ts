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

type Middleware = RequestHandler
export type MakeRequestAdapter = (method: string, url: string, query: any, body: any, params: any, route: any) => Promise<any>

interface Config {
  baseURL?: string
  makeRequest?: MakeRequestAdapter
  router?: IRouter<any>
  app?: Application
}

type StringTupleElementTypes<T extends readonly string[]> = T extends ReadonlyArray<infer U> ? U : never

export class APIDeclaration<RequestType = Request> {
  private config: Config | null = null
  public __apis: Array<{unmock(): void}> = []
  public configure(config: Config | null) {
    if (config && config.router && config.app) throw new Error('Config should only have app or router, not both')
    this.config = config
  }

  public declareGetAPI(path: string) {
    return declareAPI<RequestType>(this, 'get', path)
  }

  public declarePostAPI(path: string) {
    return declareAPI<RequestType>(this, 'post', path)
  }

  public declarePutAPI(path: string) {
    return declareAPI<RequestType>(this, 'put', path)
  }

  public declareDeleteAPI(path: string) {
    return declareAPI<RequestType>(this, 'delete', path)
  }

  public getConfig() {
    return this.config
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

function declareAPI<RequestType>(
  parent: APIDeclaration<RequestType>,
  method: 'get' | 'post' | 'put' | 'delete',
  path: string
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
    type CallArgs = BodyType &
      ActualTypeMap<StringTupleElementTypes<ParamsType>, string> &
      ActualTypeMap<StringTupleElementTypes<QueryType>, string> &
      ActualOptionalTypeMap<StringTupleElementTypes<OptionalQueryType>, string> &
      ActualTypeMap<StringTupleElementTypes<BoolQueryType>, boolean>

    return {
      response<ResponseType, ResponseTypeOnServer = ResponseType>() {
        type ActualRequestType = TypedRequest<
          RequestType,
          ActualTypeMap<StringTupleElementTypes<ParamsType>, string>,
          ActualTypeMap<StringTupleElementTypes<QueryType>, string> &
            ActualOptionalTypeMap<StringTupleElementTypes<OptionalQueryType>, string> &
            ActualTypeMap<StringTupleElementTypes<BoolQueryType>, boolean>,
          BodyType
        >
        type ImplFn = (
          req: ActualRequestType,
          res: Response
        ) => Promise<ResponseType | ResponseTypeOnServer> | ResponseType | ResponseTypeOnServer

        type MockFn = (args: CallArgs) => ResponseType | Promise<ResponseType>
        type Mock = ResponseType | ((args: CallArgs) => ResponseType | Promise<ResponseType>)

        let mockImpl: MockFn | null = null

        function call(args: CallArgs): Promise<ResponseType> {
          if (mockImpl) {
            return Promise.resolve(mockImpl(args))
          }
          const reqParams = pick(args, params),
            reqQuery = {
              ...pick(args, query),
              ...pick(args, optionalQuery),
              ...fromPairs(boolQuery.map(key => [key, (!!(args as any)[key]).toString()])),
            },
            reqBody = omit(args, [...params, ...query, ...boolQuery, ...optionalQuery])
          const config = parent.getConfig()
          if (!config || !config.makeRequest) throw new Error('Request adapter not configured')

          const pathWithParams = getURL(reqParams as any)

          return config.makeRequest(method, pathWithParams, reqQuery, reqBody, reqParams, call)
        }

        function unmock() {
          mockImpl = null
        }

        function mock(mockFnOrValue: Mock) {
          mockImpl = typeof mockFnOrValue === 'function' ? (mockFnOrValue as any) : () => mockFnOrValue
        }

        function mockOnce(mockFnOrValue: Mock) {
          mockImpl = args => {
            unmock()
            return typeof mockFnOrValue === 'function' ? (mockFnOrValue as any)(args) : mockFnOrValue
          }
        }

        call.implement = implement
        call.implementWithMiddleware = implementWithMiddleware
        call.getURL = getURL
        call.unmock = unmock
        call.mock = mock
        call.mockOnce = mockOnce

        function implement(impl: ImplFn) {
          return implementWithMiddleware([], impl)
        }

        function implementWithMiddleware(middleware: Middleware[], impl: ImplFn) {
          ;(call as any).implementation = impl
          const config = parent.getConfig()
          if (!config) throw new Error('Papupata not configured')
          const host = config.router || config.app
          if (!host) throw new Error('Papupata: neither router nor app configured, cannot implement routes')
          host[method](path, ...middleware, async (req, res, next) => {
            try {
              for (const bq of boolQuery) {
                req.query[bq] = req.query[bq] === 'true'
              }
              const value = await impl(req as any, res)
              if (value !== undefined) {
                res.send(value)
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
          (args: CallArgs): Promise<ResponseType>
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
