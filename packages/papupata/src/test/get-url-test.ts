import { APIDeclaration } from '../main'

describe('get-url-test', function() {
  const API = new APIDeclaration()
  API.configure({
    baseURL: 'http://example.com',
  })

  it('works with simple URLs', function() {
    const api = API.declareGetAPI('/simple').response<string>()
    expect(api.getURL({})).toBe('http://example.com/simple')
  })

  it('works with path params', function() {
    const api = API.declareGetAPI('/path/:alpha/and/:beta')
      .params(['alpha', 'beta'] as const)
      .response<string>()
    expect(
      api.getURL({
        alpha: 'Penn',
        beta: 'Teller',
      })
    ).toBe('http://example.com/path/Penn/and/Teller')
  })

  it('works with query params', function() {
    const api = API.declareGetAPI('/query')
      .query(['alpha', 'beta'] as const)
      .response<string>()
    expect(
      api.getURL({
        alpha: 'Penn',
        beta: 'Teller',
      })
    ).toBe('http://example.com/query?alpha=Penn&beta=Teller')
  })

  it('works both path and query params', function() {
    const api = API.declareGetAPI('/both/:alpha')
      .params(['alpha'] as const)
      .query(['beta'] as const)
      .response<string>()
    expect(
      api.getURL({
        alpha: 'Penn',
        beta: 'Teller',
      })
    ).toBe('http://example.com/both/Penn?beta=Teller')
  })

  it('query params are optional', function() {
    const api = API.declareGetAPI('/query')
      .query(['beta'] as const)
      .response<string>()
    expect(api.getURL({})).toBe('http://example.com/query')
  })

  it('query params are optional with path params', function() {
    const api = API.declareGetAPI('/both/:alpha')
      .params(['alpha'] as const)
      .query(['beta'] as const)
      .response<string>()
    expect(
      api.getURL({
        alpha: 'Penn',
      })
    ).toBe('http://example.com/both/Penn')
  })
})
