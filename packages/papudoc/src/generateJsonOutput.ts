import { Analysis, AnalyzedAPI } from './analyzer'
import { JSONAPISet, JSONApiType } from './jsonAPI'
import TSType, { RenderContext } from './typeAnalyzer/TsType'
import { v4 as uuid } from 'uuid'

export default function generateJsonOutput(analysis: Analysis): JSONAPISet {
  return analysis.map((api) => {
    return {
      name: api.api.path.join('.'),
      description: api.description,
      path: api.url,
      method: api.method,
      query: composeQueryParameters(api),
      pathParams: api.params.map((name) => ({ name })),
      body: api.bodyTsType && formatTypeAsJSON(api.bodyTsType),
      response: api.responseTsType && formatTypeAsJSON(api.responseTsType),
    }
  })
}

function composeQueryParameters(analysis: AnalyzedAPI) {
  return [
    ...analysis.query.map((q) => ({ name: q, type: 'string' as const, optional: false })),
    ...analysis.optionalQuery.map((q) => ({ name: q, type: 'string' as const, optional: true })),
    ...analysis.boolQuery.map((q) => ({ name: q, type: 'boolean' as const, optional: false })),
  ]
}

function formatTypeAsJSON(type: TSType): JSONApiType {
  const renderContext: RenderContext = {
    useCanonicalNames: false,
    inlineInterfaces: true,
    types: [type],
    linkedTypes: [],
    renderNestedTypeReact: () => {
      throw new Error('React rendering not supported with this context')
    },

    renderNestedTypeString(this: RenderContext) {
      throw new Error('String renderering not supported with this context')
    },

    renderNestedJSON(this: RenderContext, type: TSType) {
      return type.toJSON(this)
    },
  }

  const topLevelTypes: JSONApiType[] = []
  while (renderContext.types.length) {
    const toRender = renderContext.types.shift()
    topLevelTypes.push(toRender!.toJSON(renderContext))
  }
  if (topLevelTypes.length === 0) return topLevelTypes[0]

  return {
    type: 'typeNamingWrapper',
    mainType: topLevelTypes[0],
    namedTypes: topLevelTypes.slice(1),
    name: uuid(),
  }
}
