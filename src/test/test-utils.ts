import express from 'express'
import { APIDeclaration } from '../main'

let pathId = 0

export function getUniquePath() {
  return '/_path_' + ++pathId
}

export function prepareTestServerFor(api: APIDeclaration<any>) {
  let serverInstance: ReturnType<typeof runTestServerFor>

  beforeAll(() => {
    serverInstance = runTestServerFor(api)
    api.configure({
      baseURL: 'http://localhost:' + serverInstance.port,
    })
  })
  afterAll(() => serverInstance.stop())
  return {
    getPort: () => serverInstance.port,
    stop: () => serverInstance.stop(),
  }
}

export function runTestServerFor(api: APIDeclaration<any>) {
  const app = express()
  app.use(api.getExpressRouter())
  const server = app.listen(0)

  const port = (server.address() as any).port as number
  return {
    port,
    stop() {
      server.close()
    },
  }
}
