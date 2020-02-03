export const paramMatchers = (params: readonly string[]) =>
  params.map(param => ({
    name: param,
    matcher: new RegExp(`(^|/):${param}($|/)`),
  }))