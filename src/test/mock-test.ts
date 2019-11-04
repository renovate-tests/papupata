import { APIDeclaration } from '../main'

describe('mock-test', function() {
  const API = new APIDeclaration()

  API.configure({
    makeRequest: () => Promise.resolve('not mock'),
    baseURL: '',
  })

  const api = API.declareGetAPI('').response<string>()

  it('apis can be mocked', async function() {
    api.mock(() => Promise.resolve('mock'))
    expect(await api({})).toBe('mock')
    api.unmock()
  })

  it('mocks persist for multiple requests', async function() {
    api.mock(() => Promise.resolve('mock'))
    expect(await api({})).toBe('mock')
    expect(await api({})).toBe('mock')
    expect(await api({})).toBe('mock')
    api.unmock()
  })

  it('mocking can be undone', async function() {
    api.mock(() => Promise.resolve('mock'))
    api.unmock()
    expect(await api({})).toBe('not mock')
  })

  it('mockOnce only mocks for a single request', async function() {
    api.mockOnce(() => Promise.resolve('mock'))
    expect(await api({})).toBe('mock')
    expect(await api({})).toBe('not mock')
  })

  it('mocking can be undone from the declaration', async function() {
    api.mock(() => Promise.resolve('mock'))
    API.unmockAll()
    expect(await api({})).toBe('not mock')
  })

})
