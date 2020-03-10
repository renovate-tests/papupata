import { MakeRequestAdapter } from './config'
import { Response } from 'express'
import createMockResponse from './utils/mockResponse'

export type AssertResponseFn = (res: Response) => void

export interface InvokerImplementationOptions<T> {
  createRequest?(requestProps: { method: string; url: string }): T
  assertResponse?: AssertResponseFn
}
type Options<T> = InvokerImplementationOptions<T>

export default function createInvokeImplementationAdapter<T = any>(options: Options<T>): MakeRequestAdapter<any> {
  return async (method, path, query, body, params, api) => {
    if (!api.implementation) {
      throw new Error('API not implemented')
    }

    for (const boolParam of api.apiUrlParameters.boolQuery || []) {
      query[boolParam] = query[boolParam] === 'true'
    }

    const requestProps = { method, url: path }
    const requestBase = options?.createRequest?.({ method, url: path }) || requestProps

    const req = {
      ...requestBase,
      query,
      body,
      params,
    }

    const res = createMockResponse()

    const resp = await api.implementation(req, res)

    options.assertResponse?.(res as any)

    if (res.sentData) return res.sentData
    return resp
  }
}
