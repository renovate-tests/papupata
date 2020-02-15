import { Handler, Request, Response } from 'express'

export default async function runExpressMiddleware(
  middleware: Array<Handler>,
  req: Request,
  res: Response
): Promise<void> {
  const handler = middleware[0]
  if (!handler) {
    return
  }

  const handlerError = await new Promise(next => handler(req, res, next))
  if (handlerError) throw handlerError

  return runExpressMiddleware(middleware.slice(1), req, res)
}
