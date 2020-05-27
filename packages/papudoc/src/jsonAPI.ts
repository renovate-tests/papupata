interface QueryParameter {
  name: string
  optional: boolean
  type: 'string' | 'boolean'
}

type SimpleJSONApiType = {
  type: 'string' | 'number' | 'boolean' | 'undefined' | 'null' | 'void' | 'unknown' | 'never' | 'enumliteral' | 'any'
}

interface StringLiteralApiType {
  type: 'stringLiteral'
  value: string
}

interface NumberLiteralApiType {
  type: 'numberLiteral'
  value: number
}

interface BooleanLiteralApiType {
  type: 'booleanLiteral'
  value: boolean
}

interface TypeNamingWrapper {
  type: 'typeNamingWrapper'
  mainType: JSONApiType
  namedTypes: JSONApiType[]
}
interface UnionApiType {
  type: 'union'
  unionOf: JSONApiType[]
}

interface ArrayApiType {
  type: 'array'
  itemType: JSONApiType
}

interface ObjectApiType {
  type: 'object'
  properties: Array<{
    name: string
    description?: string
    required: boolean
    type: JSONApiType
  }>
}

export type JSONApiType = (
  | SimpleJSONApiType
  | TypeNamingWrapper
  | StringLiteralApiType
  | NumberLiteralApiType
  | BooleanLiteralApiType
  | UnionApiType
  | ArrayApiType
  | ObjectApiType
) & { name: string }

export interface API {
  name: string
  description?: string
  path: string
  method: string
  query: QueryParameter[]
  pathParams: Array<{ name: string }>
  body?: JSONApiType | null
  response?: JSONApiType | null
}

export type JSONAPISet = API[]
