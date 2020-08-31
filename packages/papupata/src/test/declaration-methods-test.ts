import { APIDeclaration } from '../main'
import { expect404, prepareTestServerFor } from './test-utils'
import requestPromise from 'request-promise'

describe('declaration-methods-test', function () {
  const API = new APIDeclaration()

  prepareTestServerFor(API)

  it('GET', async function () {
    const api = API.declareGetAPI('/get').response<string>()
    api.implement(() => 'Hello, world!')

    const url = api.getURL({})
    expect(url).toMatch(/http:\/\/localhost:\d+\/get/)
    const resp = await requestPromise.get(url)
    expect(resp).toBe('Hello, world!')
    await expect404(requestPromise.post(url))
  })

  it('PUT', async function () {
    const api = API.declarePutAPI('/put').response<string>()
    api.implement(() => 'Hello, world!')

    const url = api.getURL({})
    expect(url).toMatch(/http:\/\/localhost:\d+\/put/)
    const resp = await requestPromise.put(url)
    expect(resp).toBe('Hello, world!')
    await expect404(requestPromise.post(url))
  })

  it('POST', async function () {
    const api = API.declarePostAPI('/post').response<string>()
    api.implement(() => 'Hello, world!')

    const url = api.getURL({})
    expect(url).toMatch(/http:\/\/localhost:\d+\/post/)
    const resp = await requestPromise.post(url)
    expect(resp).toBe('Hello, world!')
    await expect404(requestPromise.put(url))
  })

  it('PATCH', async function () {
    const api = API.declarePatchAPI('/patch').response<string>()
    api.implement(() => 'Hello, world!')

    const url = api.getURL({})

    expect(url).toMatch(/http:\/\/localhost:\d+\/patch/)
    const resp = await requestPromise.patch(url)
    expect(resp).toBe('Hello, world!')
    await expect404(requestPromise.put(url))
  })

  it('DELETE', async function () {
    const api = API.declareDeleteAPI('/del').response<string>()
    api.implement(() => 'Hello, world!')

    const url = api.getURL({})
    expect(url).toMatch(/http:\/\/localhost:\d+\/del/)
    const resp = await requestPromise.del(url)
    expect(resp).toBe('Hello, world!')
    await expect404(requestPromise.post(url))
  })
})
