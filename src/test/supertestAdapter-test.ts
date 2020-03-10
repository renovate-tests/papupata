import { APIDeclaration } from '../main'
import createSupertestAdapter from '../main/supertestAdapter'
import express from 'express'
import bodyparser from 'body-parser'
import supertest from 'supertest'

interface RespType {
  query: any
  params: any
  body: any
}

describe('supertestAdapterTest', function() {
  describe('bodyless methods work', function() {
    it('get', async function() {
      const api = prepare<{}>('declareGetAPI')

      const resp = await api({ id: '123', qs: 'queryVal' })

      expect(resp).toEqual({ params: { id: '123' }, query: { qs: 'queryVal' }, body: {} })
    })

    it('delete', async function() {
      const api = prepare<{}>('declareDeleteAPI')

      const resp = await api({ id: '123', qs: 'queryVal' })

      expect(resp).toEqual({ params: { id: '123' }, query: { qs: 'queryVal' }, body: {} })
    })
  })

  describe('bodied methods work', function() {
    it('put', async function() {
      const api = prepare<{ greeting: string }>('declarePutAPI')

      const resp = await api({ id: '123', qs: 'queryVal', greeting: 'howdy how' })

      expect(resp).toEqual({ params: { id: '123' }, query: { qs: 'queryVal' }, body: { greeting: 'howdy how' } })
    })

    it('post', async function() {
      const api = prepare<{ greeting: string }>('declarePostAPI')

      const resp = await api({ id: '123', qs: 'queryVal', greeting: 'howdy how' })

      expect(resp).toEqual({ params: { id: '123' }, query: { qs: 'queryVal' }, body: { greeting: 'howdy how' } })
    })
    it('patch', async function() {
      const api = prepare<{ greeting: string }>('declarePatchAPI')

      const resp = await api({ id: '123', qs: 'queryVal', greeting: 'howdy how' })

      expect(resp).toEqual({ params: { id: '123' }, query: { qs: 'queryVal' }, body: { greeting: 'howdy how' } })
    })
  })

  function prepare<TBody>(
    apiDeclMethod: 'declareGetAPI' | 'declarePutAPI' | 'declarePostAPI' | 'declareDeleteAPI' | 'declarePatchAPI'
  ) {
    const app = express()
    app.use(bodyparser.json())
    const API = new APIDeclaration()
    API.configure({
      app,
      makeRequest: createSupertestAdapter(supertest(app)),
      baseURL: '',
    })
    const api = API[apiDeclMethod]('/api1/:id')
      .params(['id'] as const)
      .query(['qs'] as const)
      .body<TBody>()
      .response<RespType>()

    api.implement(({ query, body, params }) => {
      return { query, body, params }
    })

    return api
  }
})
