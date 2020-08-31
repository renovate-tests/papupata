import { APIDeclaration, handleUndefinedResponsesMiddleware } from '../main'
import { prepareTestServerFor, expectFailure } from './test-utils'
import requestPromise from 'request-promise'

let routeId = 2000
describe('204-test', function () {
  const API = new APIDeclaration()
  prepareTestServerFor(API)

  beforeAll(() => {
    API.configure({
      ...API.getConfig(),
      inherentMiddleware: [handleUndefinedResponsesMiddleware],
    })
  })

  describe('with treat undefined as 204 enabled', function () {
    it('simply returning undefined results in a 204', async function () {
      const api = API.declareGetAPI(getUniquePath()).response<void>()
      api.implement(() => {})
      const resp = await requestPromise.get(api.getURL({}), {
        resolveWithFullResponse: true,
      })
      expect(resp.statusCode).toEqual(204)
    })
    it('does not fail if headers were already sent', async function () {
      const api = API.declareGetAPI(getUniquePath()).response<void>()
      api.implement((_req, res) => {
        res.end('')
      })
      const resp = await requestPromise.get(api.getURL({}), {
        resolveWithFullResponse: true,
      })
      expect(resp.statusCode).toEqual(200)
    })

    it('explicitly setting response code overrides this behavior', async function () {
      const api = API.declareGetAPI(getUniquePath()).response<void>()
      api.implement((_req, res) => {
        res.status(400)
      })
      const err = await expectFailure(
        requestPromise.get(api.getURL({}), {
          resolveWithFullResponse: true,
        }) as any
      )
      expect(err.statusCode).toEqual(400)
    })
    it('explicitly setting response code even to 200 overrides this behavior', async function () {
      const api = API.declareGetAPI(getUniquePath()).response<void>()
      api.implement((_req, res) => {
        res.status(200)
      })
      const resp = await (requestPromise.get(api.getURL({}), {
        resolveWithFullResponse: true,
      }) as any)
      expect(resp.statusCode).toEqual(200)
    })

    it('using res.redirect overrides this behavior', async function () {
      const api = API.declareGetAPI(getUniquePath()).response<void>()
      api.implement((_req, res) => {
        res.redirect('https://www.example.com')
      })
      const err = await expectFailure(
        requestPromise.get(api.getURL({}), {
          resolveWithFullResponse: true,
          followRedirect: false,
        }) as any
      )
      expect(err.statusCode).toEqual(302)
    })
  })
})

function getUniquePath() {
  return '/test-' + ++routeId
}
