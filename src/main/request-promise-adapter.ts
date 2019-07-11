import { MakeRequestAdapter } from './index'
import requestPromise from 'request-promise'

export default function createRequestAdapter(bodyType: 'json' | 'form'): MakeRequestAdapter {
  return (method: string, url: string, query: any, body: any) => {
    return Promise.resolve(
      requestPromise({
        method,
        url,
        qs: query,
        json: true,
        [bodyType]: body,
      })
    )
  }
}
