type SimpleJSONApiType = {
  type: 'string' | 'number' | 'boolean' | 'undefined' | 'null' | 'void' | 'unknown' | 'never' | 'enumliteral' | 'any'
}

export interface StringLiteralApiType {
  type: 'stringLiteral'
  value: string
}

export interface NumberLiteralApiType {
  type: 'numberLiteral'
  value: number
}

export interface BooleanLiteralApiType {
  type: 'booleanLiteral'
  value: boolean
}

export interface TypeNamingWrapper {
  type: 'typeNamingWrapper'
  mainType: JSONApiType
  namedTypes: JSONApiType[]
}
export interface UnionApiType {
  type: 'union'
  unionOf: JSONApiType[]
}

export interface ArrayApiType {
  type: 'array'
  itemType: JSONApiType
}

export interface ObjectApiType {
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
