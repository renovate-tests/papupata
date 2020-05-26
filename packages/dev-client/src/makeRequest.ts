import { getStore, mutateStore, PPHeader } from './utils/store'
import { Config } from './config'
import getAuthHeaders from './utils/getAuthHeaders'
import { API } from './typedAPI'
import qs from 'qs'
import pick from 'lodash/pick'

export default async function makeRequest(config: Config, api: API, requestName: string) {
  const request = getStore().apis?.[api.name]?.pastRequests?.[requestName].request
  if (!request) throw new Error('Request not found')
  const before = new Date()
  try {
    const queryParams = pick(
      request.pq,
      api.query.map((q) => q.name)
    )
    const queryString = qs.stringify(queryParams)
    const url = config.baseURL + api.path + (queryString ? '?' + queryString : '')
    const body = typeof request.body === 'object' ? JSON.stringify(request.body) : request.body
    mutateStore((store) => {
      store.apis![api.name]!.pastRequests![requestName]!.sent = new Date().valueOf()
    })

    const fetched = await fetch(url, {
      method: api.method,
      headers: {
        ...(request.sendAuthHeader ? getAuthHeaders(config) : {}),
        ...Object.fromEntries((request.headers || []).filter((h) => h.name && h.value).map((h) => [h.name, h.value])),
      },
      body: api.method === 'POST' || api.method === 'PUT' || api.method === 'PATCH' ? body : undefined,
    })
    const text = await fetched.text()
    const responseHeaders: PPHeader[] = []

    for (let [name, value] of fetched.headers.entries() as any) {
      responseHeaders.push({ name, value })
    }
    mutateStore((store) => {
      store.apis![api.name]!.pastRequests![requestName]!.response = {
        data: text,
        error: null,
        headers: responseHeaders,
        status: fetched.status,
        timestamp: new Date().valueOf(),
        duration: new Date().valueOf() - before.valueOf(),
      }
    })
  } catch (err) {
    mutateStore((store) => {
      store.apis![api.name]!.pastRequests![requestName]!.response = {
        data: '',
        error: err.message,
        headers: [],
        status: 0,
        timestamp: new Date().valueOf(),
        duration: new Date().valueOf() - before.valueOf(),
      }
    })
  }
}
