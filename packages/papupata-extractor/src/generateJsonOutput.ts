import { Analysis, AnalyzedAPI } from './analyzer'
import { JSONAPISet } from 'common-types'
import { getAlternativeResponses } from './tags'

export default function generateJsonOutput(analysis: Analysis): JSONAPISet {
  return analysis.map((api) => {
    return {
      name: api.api.path.join('.'),
      description: api.description,
      path: api.url,
      method: api.method,
      query: composeQueryParameters(api),
      pathParams: api.params.map((name) => ({ name })),
      body: api.bodyJSONType,
      response: api.responseJSONType,
      alternativeResponses: getAlternativeResponses(api.tags),
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
