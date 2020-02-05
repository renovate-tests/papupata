import { APIDeclaration } from '../main'
import { expectFailure, prepareTestServerFor } from './test-utils'
import createRequestAdapter from '../main/request-promise-adapter'

describe('auto-implement-all-apis-test', function() {
  describe('autoImplementAllAPIs enabled', function() {
    const API = new APIDeclaration()

    prepareTestServerFor(API)
    beforeAll(() => {
      API.configure({ ...API.getConfig(), makeRequest: createRequestAdapter('json'), autoImplementAllAPIs: true })
    })

    it('implements immediately if app/router is present', async function() {
      const api = API.declarePostAPI('/case1')
        .body()
        .response<string>()

      const resp = await expectFailure(api({ today: new Date('2020-01-31T08:54:30.000Z') }))
      expect(resp.message).toBe('501 - "Not implemented"')
    })
  })

  describe('autoImplementAllAPIs disabled', function() {
    const API = new APIDeclaration()

    prepareTestServerFor(API)
    beforeAll(() => {
      API.configure({ ...API.getConfig(), makeRequest: createRequestAdapter('json') })
    })

    it('does not do automatic implementation', async function() {
      const api = API.declarePostAPI('/case1')
        .body()
        .response<string>()

      const resp = await expectFailure(api({ today: new Date('2020-01-31T08:54:30.000Z') }))
      expect(resp.statusCode).toBe(404)
    })
  })
})
