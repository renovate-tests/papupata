import { Method } from './types'
import { responder } from './responder'
import { IAPIDeclaration } from './index'

export function declareAPI<RequestType, RouteOptions, RequestOptions>(
  parent: IAPIDeclaration<RequestType, RouteOptions, RequestOptions>,
  method: Method,
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
    return <BT, BTInput = BT>() => {
      return responder(
        params,
        query,
        optionalQuery,
        boolQuery,
        (null as any) as BT,
        (null as any) as BTInput,
        method,
        path,
        parent,
        routeOptions
      )
    }
  }

  return {
    params: params(),
    ...params()([] as const),
  }
}
