import { setPapudocHandler } from './papudoc'

export function locator(filename: string) {
  setPapudocHandler(handleAPI)
  let APIs: any[] = []

  require(filename)

  return APIs

  function handleAPI(api: any) {
    APIs.push(api)
  }
}
