import { PapupataMiddleware } from '../config'

export async function runHandlerChain(
  handlers: Array<PapupataMiddleware<any, any>>,
  req: any,
  res: any,
  route: any
): Promise<any> {
  const [first, ...rest] = handlers
  if (!first) return undefined
  return first(req, res, route, () => runHandlerChain(rest, req, res, route))
}
