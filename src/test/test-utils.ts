import express from 'express'
import { APIDeclaration } from '../main'
import { RequestPromise } from 'request-promise'

let pathId = 0

export function getUniquePath() {
  return '/_path_' + ++pathId
}

export function prepareTestServerFor(api: APIDeclaration<any>) {
  let serverInstance: ReturnType<typeof runTestServer>

  beforeAll(() => {
    serverInstance = runTestServer()
    api.configure({
      app: serverInstance.app,
      baseURL: 'http://localhost:' + serverInstance.port,
    })
  })
  afterAll(() => serverInstance.stop())
  return {
    getPort: () => serverInstance.port,
    stop: () => serverInstance.stop(),
  }
}

export function runTestServer() {
  const app = express()
  const server = app.listen(0)

  const port = (server.address() as any).port as number
  return {
    port,
    stop() {
      server.close()
    },
    app,
  }
}

export async function expect404(requestPromise: RequestPromise) {
  const failure = await expectFailure(requestPromise as any)
  expect(failure.response.statusCode).toBe(404)
}

export async function expectFailure(promise: Promise<any>): Promise<any> {
  return promise.then(
    res => {
      throw new Error('Expected rejection; got ' + JSON.stringify(res))
    },
    err => err
  )
}
