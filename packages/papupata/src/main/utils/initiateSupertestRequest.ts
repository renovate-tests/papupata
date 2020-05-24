import type supertest from 'supertest'

export default function initiateSupertestRequest(supertestRequest: ReturnType<typeof supertest>,method: string, urlWithQuery: string, body?: any) {
  switch (method) {
    case 'get':
      return supertestRequest.get(urlWithQuery)
    case 'head':
      return supertestRequest.head(urlWithQuery)        
    case 'delete':
        return supertestRequest.delete(urlWithQuery)
    case 'post':
      return supertestRequest.post(urlWithQuery).send(body)
    case 'put':
      return supertestRequest.put(urlWithQuery).send(body)
    case 'patch':
      return supertestRequest.patch(urlWithQuery).send(body)
    default:
      throw new Error('Unsupported method ' + method)
  }
}