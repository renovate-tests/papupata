describe('body-type-variety-support-test', ( ) => {
    const API = new APIDeclaration()

  prepareTestServerFor(API)
  beforeAll(() => {
    API.configure({ ...API.getConfig(), makeRequest: createRequestAdapter('json') })
  })
    it('allows specifying a different body type for request and implementation', async function() {

    })
})