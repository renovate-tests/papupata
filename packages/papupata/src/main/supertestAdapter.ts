import { MakeRequestAdapter } from './config'
import type supertest from 'supertest'
import qs from 'qs'
import initiateSupertestRequest from './utils/initiateSupertestRequest'

export default function createSupertestAdapter(supertestRequest: ReturnType<typeof supertest>) {
  const supertestAdapter: MakeRequestAdapter<any> = async (method, url, query, body) => {
    const queryString = qs.stringify(query)
    const urlWithQuery = queryString ? `${url}?${queryString}` : url

    const response = await initiateSupertestRequest(supertestRequest, method, urlWithQuery, body)
    return response?.body
  }

  return supertestAdapter
}
