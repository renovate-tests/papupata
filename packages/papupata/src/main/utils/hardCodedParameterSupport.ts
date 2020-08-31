import qs from 'qs'
import { Request as ExpressRequest } from 'express'
enum Variant {
  HARD_CODED_VALUE,
  ANY_VALUE,
  FORBIDDEN,
  NON_MATCH,
}

interface Query {
  [name: string]: string
}

export function getQueryWithHardCodedParameters(hardCoded: HardCodedParameters, queryParams: Query): Query {
  if (!hardCoded.length) return queryParams

  const output = { ...queryParams }
  for (const parameter of hardCoded) {
    switch (parameter.variant) {
      case Variant.HARD_CODED_VALUE:
        if (parameter.name in output && output[parameter.name] !== parameter.value) {
          throw new Error(
            `The parameter ${parameter.name}, if present, is required to have the value "${parameter.value}" (given: "${
              output[parameter.name]
            }").`
          )
        }
        output[parameter.name] = parameter.value
        break
      case Variant.NON_MATCH:
        if (output[parameter.name] === parameter.value) {
          throw new Error(`The parameter ${parameter.name} is not allowed to have the value ${parameter.value}.`)
        }
    }
  }
  return output
}

export type HardCodedParameters = Array<
  { name: string } & (
    | {
        variant: Variant.HARD_CODED_VALUE | Variant.NON_MATCH
        value: string
      }
    | { variant: Variant.ANY_VALUE | Variant.FORBIDDEN }
  )
>

export function verifyHardCodedQueryParameterDeclarationLegality(
  hardCoded: HardCodedParameters,
  requiredQueryParamNames: readonly string[],
  optionalQueryParameterNames: readonly string[]
) {
  for (const hc of hardCoded) {
    switch (hc.variant) {
      case Variant.ANY_VALUE:
        if (!requiredQueryParamNames.includes(hc.name)) {
          throw new Error(`Parameter ${hc.name} is required, yet not present as a declared query parameter`)
        }
        break
      case Variant.FORBIDDEN:
        if (requiredQueryParamNames.includes(hc.name) || optionalQueryParameterNames.includes(hc.name)) {
          throw new Error('Parameter ' + hc.name + ' is forbidden, but present in the query parameter declarations.')
        }
        break
      case Variant.HARD_CODED_VALUE:
        if (requiredQueryParamNames.includes(hc.name)) {
          throw new Error(
            'Parameter ' +
              hc.name +
              ' has a specific value and is not allowed to be required to be entered into the invocation.'
          )
        }
        break
    }
  }
}

export function extractHardCodedParameters(
  pathWithHardCodedQuery: string
): { path: string; hardCodedParameters: HardCodedParameters } {
  const questionMarkAt = pathWithHardCodedQuery.indexOf('?')
  if (questionMarkAt === -1) return { path: pathWithHardCodedQuery, hardCodedParameters: [] }

  const path = pathWithHardCodedQuery.slice(0, questionMarkAt)
  const fragments = pathWithHardCodedQuery.slice(questionMarkAt + 1).split('&')

  const hardCodedParameters = fragments.map((fragment) => {
    if (fragment.startsWith('!')) {
      return { name: fragment.substring(1), variant: Variant.FORBIDDEN as const }
    }
    if (!fragment.includes('=')) {
      return { name: fragment, variant: Variant.ANY_VALUE as const }
    } else {
      const parsed = qs.parse(fragment)
      const name = Object.keys(parsed)[0]
      const value = parsed[name]
      if (typeof value !== 'string') {
        throw new Error('Hard coded parameters must be strings')
      }
      if (name.endsWith('!')) {
        return {
          name: name.substring(0, name.length - 1),
          value,
          variant: Variant.NON_MATCH as const,
        }
      } else {
        return {
          name,
          value,
          variant: Variant.HARD_CODED_VALUE as const,
        }
      }
    }
  })
  return { path, hardCodedParameters }
}

export function matchesHardCodedParameters(request: ExpressRequest, hardCoded: HardCodedParameters): boolean {
  if (!hardCoded.length) return true
  const { query } = request
  return hardCoded.every((hc) => {
    switch (hc.variant) {
      case Variant.HARD_CODED_VALUE:
        return query[hc.name] === hc.value
      case Variant.FORBIDDEN:
        return query[hc.name] === undefined
      case Variant.ANY_VALUE:
        return query[hc.name] !== undefined
      case Variant.NON_MATCH:
        return query[hc.name] !== hc.value
      default:
        throw new Error('Internal error')
    }
  })
}
