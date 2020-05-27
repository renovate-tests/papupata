import { Config } from '../config'

export default async function getCSRFHeader(config: Config): Promise<null | { 'x-csrf-token': string }> {
  if (!config.csrfToken) return null

  const resp = await (await fetch(config.csrfToken.path)).json()
  return {
    'x-csrf-token': resp[config.csrfToken.field],
  }
}
