import { APIDeclaration } from '../main'
import { prepareTestServerFor } from './test-utils'
import requestPromise from 'request-promise'

describe('declaration-parameters-test', function () {
  const API = new APIDeclaration()

  prepareTestServerFor(API)

  it('query parameters', async function () {
    const api = API.declareGetAPI('/query')
      .query(['name', 'job'] as const)
      .response<string>()
    api.implement((req) => `Hello, ${req.query.name}, I see you are a ${req.query.job}`)

    const url = api.getURL({})
    expect(url).toMatch(/http:\/\/localhost:\d+\/query/)
    const resp = await requestPromise.get(url, { qs: { name: 'Bob', job: 'Doctor' } })
    expect(resp).toBe('Hello, Bob, I see you are a Doctor')
  })

  it('boolean query parameters', async function () {
    const api = API.declareGetAPI('/boolquery')
      .queryBool(['a', 'b', 'c'] as const)
      .response<string>()
    api.implement(({ query: { a, b, c } }) => `Values ${a}, ${b}, ${c}`)

    const url = api.getURL({})
    expect(url).toMatch(/http:\/\/localhost:\d+\/boolquery/)
    const resp = await requestPromise.get(url, { qs: { a: 'true', b: 'false' } })
    expect(resp).toBe('Values true, false, false')
  })

  it('optional query parameters', async function () {
    const api = API.declareGetAPI('/optquery')
      .optionalQuery(['a', 'b'] as const)
      .response<string>()
    api.implement(({ query: { a, b } }) => `Values ${a}, ${b}`)

    const url = api.getURL({})
    expect(url).toMatch(/http:\/\/localhost:\d+\/optquery/)
    const resp = await requestPromise.get(url, { qs: { a: 'exists' } })
    expect(resp).toBe('Values exists, undefined')
  })

  it('path parameters', async function () {
    const api = API.declareGetAPI('/path/:name/is/:job')
      .params(['name', 'job'] as const)
      .response<string>()
    api.implement((req) => `Hello, ${req.params.name}, I see you are a ${req.params.job}`)

    const url = api.getURL({ name: 'Bob', job: 'Doctor' })
    expect(url).toMatch(/http:\/\/localhost:\d+\/path\/Bob\/is\/Doctor/)
    const resp = await requestPromise.get(url)
    expect(resp).toBe('Hello, Bob, I see you are a Doctor')
  })

  it('body', async function () {
    const api = API.declarePostAPI('/body').body<{ name: string; age: number }>().response<string>()
    api.implement((req) => `Hello, ${req.body.name}, age ${req.body.age}`)

    const url = api.getURL({})
    expect(url).toMatch(/http:\/\/localhost:\d+\/body/)
    const resp = await requestPromise.post(url, { json: { name: 'Bob', age: 53 } })
    expect(resp).toBe('Hello, Bob, age 53')
  })
  it('non-object body', async function () {
    const api = API.declarePostAPI('/body/non-object').body<string>().response<string>()
    api.implement((req) => `[${req.body}]`)

    const url = api.getURL({})
    expect(url).toMatch(/http:\/\/localhost:\d+\/body/)
    const resp = await requestPromise.post(url, { body: 'kevin', headers: { 'Content-Type': 'text/plain' } })
    expect(resp).toBe('[kevin]')
  })

  it('combination of all', async function () {
    const comboAPI = API.declarePutAPI('/combo/:p1/:p2')
      .params(['p1', 'p2'] as const)
      .query(['q1', 'q2'] as const)
      .optionalQuery(['oq1', 'oq2'] as const)
      .queryBool(['bq1', 'bq2'] as const)
      .body<{ b1: string; b2: boolean }>()
      .response<string>()

    comboAPI.implement(({ query, params, body }) => JSON.stringify({ query, params, body }))

    const url = comboAPI.getURL({ p1: 'p1val', p2: 'p2val' })
    expect(url).toMatch(/http:\/\/localhost:\d+\/combo\/p1val\/p2val/)
    const resp = await requestPromise.put(url, {
      json: { b1: 'b1val', b2: true },
      qs: {
        q1: 'q1val',
        q2: 'q2val',
        oq1: 'oq1val',
        bq1: 'true',
        bq2: 'false',
      },
    })
    expect(resp).toEqual({
      body: {
        b1: 'b1val',
        b2: true,
      },
      params: {
        p1: 'p1val',
        p2: 'p2val',
      },
      query: {
        bq1: true,
        bq2: false,
        oq1: 'oq1val',
        q1: 'q1val',
        q2: 'q2val',
      },
    })
  })
})
