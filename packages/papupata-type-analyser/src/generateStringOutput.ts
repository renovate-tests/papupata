import TSType, { RenderContext } from './typeAnalyzer/TsType'

export default function generateStringOutput(type: TSType): string {
  const renderContext: RenderContext = {
    useCanonicalNames: false,
    inlineInterfaces: true,
    types: [type],
    linkedTypes: [],

    renderNestedTypeString(this: RenderContext) {
      return type.toTypeString(this)
    },

    renderNestedJSON(this: RenderContext) {
      throw new Error('JSON output not supported')
    },
  }

  const topLevelTypes: string[] = []
  while (renderContext.types.length) {
    const toRender = renderContext.types.shift()
    topLevelTypes.push(toRender!.toTypeString(renderContext))
  }
  if (topLevelTypes.length === 0) return ''

  return topLevelTypes.join('\n')
}
