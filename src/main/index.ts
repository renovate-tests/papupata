import { Config, MakeRequestAdapter as MakeRequestAdapterImpl } from './config'
import { Request } from 'express'
import { declareAPI } from './declareAPI'
import middleware204 from './middleware204'

export type TypedRequest<RequestBaseType, Params, Query, Body> = Omit<RequestBaseType, 'params' | 'query' | 'body'> & {
  params: Params
  query: Query
  body: Body
}

export type MakeRequestAdapter<RequestOptions = void> = MakeRequestAdapterImpl<RequestOptions>

interface API {
  unmock(): void
  implementation: any
  implementWithMiddleware: any
  implementationMiddleware: any
  implement(implementation: any): any
}

export interface IAPIDeclaration<RequestType, RouteOptions, RequestOptions> {
  getConfig(): Config<RequestType, RouteOptions, RequestOptions> | null
  __apis: Array<API>
}

export class APIDeclaration<RequestType = Request, RouteOptions = void, RequestOptions = void>
  implements IAPIDeclaration<RequestType, RouteOptions, RequestOptions> {
  private config: Config<RequestType, RouteOptions, RequestOptions> | null = null
  public __apis: Array<API> = []

  public configure(config: Config<RequestType, RouteOptions, RequestOptions> | null) {
    if (config && config.router && config.app) throw new Error('Config should only have app or router, not both')
    const needsAutoImplement =
      config &&
      config.autoImplementAllAPIs &&
      (!this.config || config.router !== this.config.router || config.app !== this.config.app) &&
      (config.router || config.app)

    this.config = config
    if (needsAutoImplement) {
      this.implementAllAPIs()
    }
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

  public implementAllAPIs() {
    for (const api of this.__apis) {
      const implementation = api.implementation
      if (implementation) {
        api.implementWithMiddleware(api.implementationMiddleware, api.implementation)
      } else {
        api.implement(null)
      }
    }
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

export const handleUndefinedResponsesMiddleware = middleware204