import { APIDeclaration } from '../main'
import { prepareTestServerFor } from './test-utils'
import requestPromise from 'request-promise'

describe('api-declaration-test', function() {
  const API = new APIDeclaration()

  prepareTestServerFor(API)

  describe('simple get API', function() {
    it('returns a value as is', async function() {
      const api = API.declareGetAPI('/simple-return').response<string>()
      api.implement(() => 'Hello, world!')

      const url = api.getURL({})
      expect(url).toMatch(/http:\/\/localhost:\d+\/simple-return/)
      const resp = await requestPromise.get(url)
      expect(resp).toBe('Hello, world!')
    })
    it.todo('returns a promise')
  })
})
