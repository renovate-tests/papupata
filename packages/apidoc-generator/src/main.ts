import { JSONAPI, JSONAPISet, JSONApiType } from 'common-types'
import apidoc from 'apidoc'
import * as fs from 'fs'
import * as path from 'path'
import { apidocAPI, apidocDescription, apidocGroup, apidocParam, apidocSuccess } from './apidocHelpers'

import {
  ArrayApiType,
  BooleanLiteralApiType,
  NumberLiteralApiType,
  ObjectApiType,
  SimpleJSONApiType,
  StringLiteralApiType,
  UnionApiType,
} from 'common-types/lib/jsonAPIType'

const verySimpleTypes = [
  'string',
  'number',
  'boolean',
  'undefined',
  'null',
  'void',
  'unknown',
  'never',
  'enumliteral',
  'any',
]

export function generateAPIDoc(outDir: string, apis: JSONAPISet[]) {
  const tempDir = initTempDir()
  const tempFile = path.join(tempDir, 'index.html')
  try {
    createApidocInputFile(tempFile, apis)
    apidoc.createDoc({
      src: tempFile,
      dest: outDir,
    })
  } finally {
    fs.unlinkSync(tempFile)
  }
}

function initTempDir() {
  return fs.mkdtempSync('ppapidoc')
}

function createApidocInputFile(filename: string, apis: JSONAPISet[]) {
  const lines = [...createApidocInputFileLines(apis)]
  fs.writeFileSync(filename, lines.join('\n'))
}

function* createApidocInputFileLines(apis: JSONAPISet[]) {
  yield '/**'
  for (const apiSet of apis) {
    for (const api of apiSet) {
      yield apidocAPI(api.method, api.path, api.name)
      if (api.description) {
        yield apidocDescription(api.description)
      }
      const group = determineGroup(api)
      if (group) {
        yield apidocGroup(group)
      }

      for (const path of api.pathParams) {
        yield formatPathParameter(path)
      }

      for (const query of api.query) {
        yield formatQueryParameter(query)
      }

      if (api.body) {
        yield* formatBody(api.body)
      }

      if (api.response) {
        yield* formatResponse(api.response)
      }
    }
  }
  yield '*/'
}

function determineGroup(api: JSONAPI) {
  return api.name.split('.').slice(0, -1).join('.l')
}

function formatPathParameter(pathParameter: JSONAPI['pathParams'][0]) {
  // TODO: we need descriptions for these
  return apidocParam('Path', 'string', pathParameter.name)
}

function formatQueryParameter(queryParameter: JSONAPI['query'][0]) {
  // TODO: we need descriptions for these
  return apidocParam('Query', queryParameter.type, queryParameter.name, queryParameter.optional)
}

function* formatBody(body: JSONAPI['body']): IterableIterator<string> {
  yield* formatTypeEntry(
    body,
    (type: string, path: string[], optional = false, description?: string) => {
      return apidocParam('Body', type, path.join('.'), optional, description)
    },
    []
  )
}

function* formatResponse(response: JSONAPI['response']) {
  yield* formatTypeEntry(
    response,
    (type: string, path: string[], optional = false, description?: string) => {
      return apidocSuccess(type, path.join('.'), optional, description)
    },
    []
  )
}

type FormatTypeEntryFn = (type: string, path: string[], optional?: boolean, description?: string) => string

function* formatTypeEntry(
  type: JSONApiType,
  formatEntry: FormatTypeEntryFn,
  path: string[],
  namedTypes: JSONApiType[] = [],
  optional = false
): IterableIterator<string> {
  if (!type) return
  if (isSimpleType(type)) {
    yield formatEntry(formatTypeString(type), path, optional)
  } else {
    switch (type.type) {
      case 'typeNamingWrapper':
        yield* formatTypeEntry(type.mainType, formatEntry, path, namedTypes)
        break
      case 'union':
        yield* formatUnion(type, formatEntry, path, namedTypes, optional)
        break
      case 'array':
        yield* formatArray(type, formatEntry, path, namedTypes, optional)
        break
      case 'object':
        yield* formatObject(type, formatEntry, path, namedTypes, optional)
        break
      default:
        throw new Error('Not supported: ' + (type as any).type)
    }
  }
}

function formatTypeString(type: JSONApiType): string {
  if (isVerySimpleType(type)) {
    return type.type
  }
  switch (type.type) {
    case 'stringLiteral':
    case 'numberLiteral':
    case 'booleanLiteral':
      return type.value.toString()
    default:
      throw new Error(`${type.type} is not a simple type`)
  }
}

function* formatArray(
  type: ArrayApiType,
  formatEntry: FormatTypeEntryFn,
  path: string[],
  namedTypes: JSONApiType[] = [],
  optional: boolean
): IterableIterator<string> {
  if (isSimpleType(type.itemType)) {
    // TODO needs description
    yield formatEntry(formatTypeString(type.itemType) + '[]', path, optional)
  } else {
    yield formatEntry('array', path, optional)
    yield* formatTypeEntry(type.itemType, formatEntry, [...path, '[]'], namedTypes, optional)
  }
}
function* formatObject(
  type: ObjectApiType,
  formatEntry: FormatTypeEntryFn,
  path: string[],
  namedTypes: JSONApiType[] = [],
  optional: boolean
): IterableIterator<string> {
  // TODO needs description
  yield formatEntry('object', path, optional)
  for (const property of type.properties) {
    yield* formatTypeEntry(property.type, formatEntry, [...path, property.name], namedTypes, !property.required)
  }
}

function* formatUnion(
  type: UnionApiType,
  formatEntry: FormatTypeEntryFn,
  path: string[],
  namedTypes: JSONApiType[] = [],
  optional: boolean
): IterableIterator<string> {
  // Most of these cases are going to be:
  // - X | undefined
  // - X | undefined | null
  // 'a' | 'b' | 'c'
  const undefinedType = type.unionOf.find((t) => t.type === 'undefined')
  const nullType = type.unionOf.find((t) => t.type === 'null')

  if (undefinedType || nullType) {
    const remaining = type.unionOf.filter((u) => u !== undefinedType && u !== nullType)
    if (remaining.length === 0) {
      // union of undefined and null
      yield* formatTypeEntry(nullType!, formatEntry, path, namedTypes, true)
    } else if (remaining.length === 1) {
      yield* formatTypeEntry(remaining[0], formatEntry, path, namedTypes, true)
    } else {
      yield* formatTypeEntry(
        {
          ...type,
          name: '', // TODO: this seems wrong
          unionOf: remaining,
        },
        formatEntry,
        path,
        namedTypes,
        true
      )
    }
  } else {
    const literalTypes = ['stringLiteral', 'numberLiteral', 'booleanLiteral']
    if (type.unionOf.every((u) => literalTypes.includes(u.type))) {
      // only literals
      yield formatEntry('enum', path, optional, type.unionOf.map((u: any) => u.value.toString()).join(', '))
    }
    throw new Error('NYI')
  }
}

function isVerySimpleType(type: any): type is SimpleJSONApiType {
  return verySimpleTypes.includes((type as any).type)
}

function isSimpleType(
  type: any
): type is SimpleJSONApiType | StringLiteralApiType | NumberLiteralApiType | BooleanLiteralApiType {
  return (
    isVerySimpleType(type) ||
    type.type === 'numberLiteral' ||
    type.type === 'stringLiteral' ||
    type.type === 'booleanLiteral'
  )
}
