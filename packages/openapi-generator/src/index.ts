import { JSONAPI } from 'common-types'
import { OpenApiConfig } from 'common-types/lib/OpenApiConfig'
import * as fs from 'fs'
import { JSONApiType } from 'common-types/lib/jsonAPIType'
import convertJSONAPIType from 'papupata-json-to-schema'

export function generateOpenApi(config: OpenApiConfig, apis: JSONAPI[]) {
  const openAPI = { ...config.base }
  if (!openAPI.paths) openAPI.paths = {}

  for (const api of apis) {
    const path = fixPath(api.path)
    if (!openAPI.paths[path]) openAPI.paths[path] = {}
    openAPI.paths[path][api.method.toLowerCase()] = {
      description: api.description,
      summary: api.name,
      'x-papupata-name': api.name,
      responses: {
        200: {
          description: 'Success',
          content: {
            [determineContentType(api.response)]: {
              schema: asSchema(api.response),
            },
          },
        },
        ...getAlternativeResponses(api),
      },
      parameters: [
        ...api.pathParams.map((param) => ({
          name: param.name,
          in: 'path',
          schema: { type: 'string' },
          required: true,
        })),
        ...api.query.map((q) => ({
          name: q.name,
          in: 'query',
          required: !q.optional,
          schema: { type: 'string' },
          ...(q.type === 'boolean' ? { enum: ['true', 'false'] } : {}),
        })),
      ],
      requestBody: api.body
        ? {
            content: {
              [determineContentType(api.body)]: {
                schema: asSchema(api.body),
              },
            },
          }
        : undefined,
    }
  }

  fs.writeFileSync(config.filename, JSON.stringify(openAPI, null, 2), 'utf-8')

  function determineContentType(type: JSONApiType | null | undefined) {
    const vagueTypes = ['undefined', 'null', 'void', 'unknown', 'any']
    const textTypes = ['string', 'number', 'boolean', 'stringLiteral', 'numberLiteral', 'booleanLiteral']
    if (!type || vagueTypes.includes(type.type)) return '*/*'
    if (textTypes.includes(type.type)) return config.textContentType || 'text/plain'
    return config.objectContentType || 'application/json'
  }
}

function asSchema(type: JSONApiType | null | undefined) {
  if (!type) return undefined
  return convertJSONAPIType(type, 'OpenAPI')
}

function fixPath(path: string) {
  return path.replace(/(?<=\/):([^/]+)/, '{$1}')
}

function getAlternativeResponses(api: JSONAPI) {
  const sorted = api.alternativeResponses.sort((a, b) => b.code - a.code)
  const responses: any = {}
  for (const entry of sorted) {
    responses[entry.code] = { description: entry.description ?? 'No description.' }
  }
  return responses
}
