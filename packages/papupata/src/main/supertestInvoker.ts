import type supertest from 'supertest'
import initiateSupertestRequest from './utils/initiateSupertestRequest'
import qs from 'qs'
import { MockableAPI } from './mockableAPI'

export default function invokeSupertest<Arg, Ret>(
  supertestRequest: ReturnType<typeof supertest>,
  api: MockableAPI<Arg, Ret>,
  args: Arg
) {
  const config = api.apiDeclaration.getConfig()

  // for some reason ts refuses to accept that the value can be changed from null without the as any
  let partialSupertestRequest: null | ReturnType<typeof initiateSupertestRequest> = null as any
  api.apiDeclaration.configure({
    ...config,
    makeRequest: async (method: string, url: string, query: any, body: any) => {
      const queryString = qs.stringify(query)
      const urlWithQuery = queryString ? `${url}?${queryString}` : url

      partialSupertestRequest = initiateSupertestRequest(supertestRequest, method, urlWithQuery, body)
      return null as any
    },
  })

  try {
    api(args)
    if (!partialSupertestRequest) throw new Error('Internal error')
    return partialSupertestRequest
  } finally {
    api.apiDeclaration.configure(config)
  }
}
