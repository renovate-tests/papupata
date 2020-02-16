import { PapupataMiddleware } from './config'

const middleware204: PapupataMiddleware<any, any> = async (_req, res, _route, next) => {
  let statusCode = res.statusCode,
    statusCodeSet = false
  Object.defineProperty(res, 'statusCode', {
    enumerable: true,
    get() {
      return statusCode
    },
    set(newStatusCode: number) {
      statusCode = newStatusCode
      statusCodeSet = true
    },
  })
  const response = await next()

  if (response === undefined) {
    if (!res.headersSent) {
      if (!statusCodeSet) {
        res.status(204)
      }
      res.end()
    }
  } else {
    return response
  }
}

export default middleware204
