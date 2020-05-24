import { APISet } from '../typedAPI'

const minimalAPI = {
  path: '/',
  method: 'GET',
  query: [],
  pathParams: [],
  response: { type: 'void' as const },
  body: { type: 'void' as const },
}

const exampleAPI: APISet = [
  {
    name: 'Test API',
    path: '/test/:id',
    method: 'POST',
    description: 'This is a test API',
    query: [
      {
        name: 'qstr',
        type: 'string',
        optional: false,
      },
      {
        name: 'qopt',
        optional: true,
        type: 'string',
      },
      {
        name: 'qbool',
        optional: false,
        type: 'boolean',
      },
    ],
    pathParams: [{ name: 'id' }],
    body: {
      type: 'string',
    },
    response: {
      type: 'string',
    },
  },
  {
    name: 'collection.a1',
    ...minimalAPI,
  },
  {
    name: 'collection.a2',
    ...minimalAPI,
  },
]

export default exampleAPI
