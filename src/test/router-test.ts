import { APIDeclaration } from '../main'
import { runTestServer } from './test-utils'
import createRequestAdapter from '../main/request-promise-adapter'
import { Router } from 'express'

describe('router-test', function() {
  let testServer: ReturnType<typeof runTestServer>

  beforeAll(() => {
    testServer = runTestServer()
  })

  afterAll(() => {
    testServer.stop()
  })

  it('routes can be implemented and called via routers', async function() {
    const router = Router()
    testServer.app.use(router)
    const API = new APIDeclaration()
    API.configure({
      baseURL: `http://localhost:${testServer.port}`,
      makeRequest: createRequestAdapter('json'),
      router,
    })
    const testAPI = API.declareGetAPI('/test').response<string>()

    testAPI.implement(() => 'hello')

    const resp = await testAPI()
    expect(resp).toEqual('hello')
  })

  it('routes can be implemented and called via routers in paths', async function() {
    const routerPath = '/subdir'
    const router = Router()
    testServer.app.use(routerPath, router)
    const API = new APIDeclaration()
    API.configure({
      baseURL: `http://localhost:${testServer.port}`,
      makeRequest: createRequestAdapter('json'),
      router,
      routerAt: routerPath
    })
    const testAPI = API.declareGetAPI('/subdir/updog').response<string>()

    testAPI.implement(() => 'hello')

    const resp = await testAPI()
    expect(resp).toEqual('hello')
  })
})
