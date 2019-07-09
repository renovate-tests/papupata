import { Request, Response, RequestHandler, Router } from 'express'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import fromPairs from 'lodash/fromPairs'

// This type is used in failure cases to give a better error message, technically it could just be replaced with "never"
type DeclareRoutePartsAsConstArraysPlease = { 'must-be-const': never }

export type TypedRequest<RequestBaseType, Params, Query, Body> = Omit<RequestBaseType, 'params' | 'query' | 'body'> & {
  params: Params
  query: Query
  body: Body
}

type Middleware = RequestHandler

interface Config {
  baseURL?: string
  makeRequest?: (method: string, path: string, query: any, body: any, params: any) => Promise<any>
}

type StringTupleElementTypes<T extends readonly string[]> = T extends ReadonlyArray<infer U> ? U : never

export class APIDeclaration<RequestType = Request> {
  private config: Config | null = null
  private router = Router()
  public configure(config: Config | null) {
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

  public getExpressRouter() {
    return this.router
  }

  public getConfig() {
    return this.config
  }
}

const paramMatchers = (params: readonly string[]) =>
  params.map(param => ({
    name: param,
    matcher: new RegExp(`(?<=^|/):${param}(?=$|/)`),
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
    return {
      response<ResponseType, ResponseTypeOnServer = ResponseType>() {
        type ImplFn = (
          req: TypedRequest<
            RequestType,
            ActualTypeMap<StringTupleElementTypes<ParamsType>, string>,
            ActualTypeMap<StringTupleElementTypes<QueryType>, string> &
              ActualOptionalTypeMap<StringTupleElementTypes<OptionalQueryType>, string> &
              ActualTypeMap<StringTupleElementTypes<BoolQueryType>, boolean>,
            BodyType
          >,
          res: Response
        ) => Promise<ResponseType | ResponseTypeOnServer> | ResponseType | ResponseTypeOnServer

        function call(
          args: BodyType &
            ActualTypeMap<StringTupleElementTypes<ParamsType>, string> &
            ActualTypeMap<StringTupleElementTypes<QueryType>, string> &
            ActualOptionalTypeMap<StringTupleElementTypes<OptionalQueryType>, string> &
            ActualTypeMap<StringTupleElementTypes<BoolQueryType>, boolean>
        ): Promise<ResponseType> {
          const reqParams = pick(args, params),
            reqQuery = {
              ...pick(args, query),
              ...pick(args, optionalQuery),
              ...fromPairs(boolQuery.map(key => [key, (!!(args as any)[key]).toString()])),
            },
            reqBody = omit(args, [...params, ...query])
          const config = parent.getConfig()
          if (!config || !config.makeRequest) throw new Error('Request adapter not configured')

          const pathWithParams = getURL(reqParams as any)

          return config.makeRequest(method, pathWithParams, reqQuery, reqBody, reqParams)
        }

        call.implement = implement
        call.implementWithMiddleware = implementWithMiddleware
        call.getURL = getURL

        function implement(impl: ImplFn) {
          return implementWithMiddleware([], impl)
        }

        function implementWithMiddleware(middleware: Middleware[], impl: ImplFn) {
          ;(call as any).implementation = impl
          parent.getExpressRouter()[method](path, ...middleware, async (req, res, next) => {
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

        function getURL(pathParams: ActualTypeMap<StringTupleElementTypes<ParamsType>, string>) {
          const config = parent.getConfig()
          if (!config) throw new Error('Papupata not configured')
          if (config.baseURL === undefined) throw new Error('Cannot get URL of a route with base URL not set up')
          return config.baseURL + applyPathParams(pathParams)
        }

        // Typescript is fine without this explicit typing here, but idea's autocomplete does not work without it
        return call as {
          (
            args: BodyType &
              ActualTypeMap<StringTupleElementTypes<ParamsType>, string> &
              ActualTypeMap<StringTupleElementTypes<QueryType>, string> &
              ActualOptionalTypeMap<StringTupleElementTypes<OptionalQueryType>, string> &
              ActualTypeMap<StringTupleElementTypes<BoolQueryType>, boolean>
          ): Promise<ResponseType>
          implement: (impl: ImplFn) => void
          implementation?: ImplFn
          implementWithMiddleware: (middleware: Middleware[], impl: ImplFn) => void
          getURL: (pathParams: ActualTypeMap<StringTupleElementTypes<ParamsType>, string>) => string
        }

        function applyPathParams(reqParams: ActualTypeMap<StringTupleElementTypes<ParamsType>, string>) {
          const pathWithParams = paramMatchers(params).reduce((currPath, { matcher, name }) => {
            return currPath.replace(matcher, (reqParams as any)[name])
          }, path)
          return pathWithParams
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
