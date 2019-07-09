import express from 'express'
import { APIDeclaration } from '../main'

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
