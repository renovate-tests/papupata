import generateJsonOutput from './generateJsonOutput'
import { JSONApiType } from 'common-types'
import ts from 'typescript'
import { prepareTsTypeConverter } from './typeAnalyzer/typeAnalyzer'
import generateStringOutput from './generateStringOutput'

export function generateTypeJSON(
  type: ts.Type,
  typeChecker: ts.TypeChecker,
  contextualName: string[] = []
): JSONApiType {
  const converter = prepareTsTypeConverter(typeChecker)

  return generateJsonOutput(converter(contextualName, type))
}

export function generateTypeString(type: ts.Type, typeChecker: ts.TypeChecker, contextualName: string[] = []): string {
  const converter = prepareTsTypeConverter(typeChecker)

  return generateStringOutput(converter(contextualName, type))
}
