import { loadConfig, PapudocConfig } from './config'
import generateFront from './generateFront'
import { Analysis, analyze } from './analyzer'
import getRequireableFilename from './util/getRequirableFilename'
import { papudoc as handlePapudoc } from './papudoc'
import * as path from 'path'
import * as fs from 'fs'
import generateJsonOutput from './generateJsonOutput'

export function generatePapudoc(configOrConfigFile?: string | PapudocConfig) {
  const config: PapudocConfig =
    !configOrConfigFile || typeof configOrConfigFile === 'string' ? loadConfig(configOrConfigFile) : configOrConfigFile

  const analysisSet = config.sourceFiles.map((filename) =>
    analyze(config, getRequireableFilename(config.baseDir || process.cwd(), filename))
  )

  const analysis = combineAnalysis(analysisSet)
  generateFront(path.resolve(process.cwd(), config.baseDir || '', config.outDir || './papudoc'), analysis)

  if (config.JSONOutput) {
    const jsonFile = (process.cwd(), config.baseDir || '', config.JSONOutput)
    fs.writeFileSync(jsonFile, JSON.stringify(generateJsonOutput(analysis), null, 2), 'utf8')
  }
}

function combineAnalysis(analysisSet: Analysis[]) {
  return ([] as Analysis).concat(...analysisSet)
}

export const papudoc = handlePapudoc
