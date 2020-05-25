interface QueryParameter {
  name: string
  optional: boolean
  type: 'string' | 'boolean'
}

export  type AnyType = {
  type: 'string' | 'void'
}

export interface API {
  name: string
  description?: string
  path: string
  method: string
  query: QueryParameter[]
  pathParams: Array<{ name: string }>
  body: AnyType
  response: AnyType
}

export type APISet = API[]
