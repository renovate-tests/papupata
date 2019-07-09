import { APIDeclaration } from '../main'
import { prepareTestServerFor } from './test-utils'
import requestPromise from 'request-promise'

describe('declaration-methods-test', function() {
  const API = new APIDeclaration()

  prepareTestServerFor(API)

  describe('GET', async function() {
    const api = API.declareGetAPI('/simple-return').response<string>()
    api.implement(() => 'Hello, world!')

    const url = api.getURL({})
    expect(url).toMatch(/http:\/\/localhost:\d+\/simple-return/)
    const resp = await requestPromise.get(url)
    expect(resp).toBe('Hello, world!')
  })
})
