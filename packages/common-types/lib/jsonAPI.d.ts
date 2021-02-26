import type { JSONApiType } from './jsonAPIType'

interface QueryParameter {
  name: string
  optional: boolean
  type: 'string' | 'boolean'
}

export interface JSONAPI {
  name: string
  description?: string
  path: string
  method: string
  query: QueryParameter[]
  pathParams: Array<{ name: string }>
  body?: JSONApiType | null
  response?: JSONApiType | null
  alternativeResponses: Array<{
    code: number
    description?: string
  }>
}

export type JSONAPISet = JSONAPI[]
