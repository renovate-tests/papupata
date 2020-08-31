import { APIDeclaration } from '../main'

describe('getDeclaredAPIs', function () {
  it('works', function () {
    const API = new APIDeclaration()

    expect(API.getDeclaredAPIs()).toEqual([])
    const banana = API.declareGetAPI('/banana').response<string>()
    expect(API.getDeclaredAPIs()).toEqual([banana])

    const lemon = API.declarePostAPI('/lemon').response<string>()
    expect(API.getDeclaredAPIs()).toEqual([banana, lemon])
  })
  it('partial declarations are not included', function () {
    const API = new APIDeclaration()

    expect(API.getDeclaredAPIs()).toEqual([])
    API.declareGetAPI('/banana')
    expect(API.getDeclaredAPIs()).toEqual([])

    API.declarePostAPI('/lemon').body<string>()
    expect(API.getDeclaredAPIs()).toEqual([])
  })
})
