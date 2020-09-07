import { loadConfig, PapudocConfig } from './config'
import generateFront from './generateFront'
import getRequireableFilename from '../../common-utils/src/getRequirableFilename'
import { papudoc as handlePapudoc } from './papudoc'
import * as path from 'path'
import * as fs from 'fs'
import { generateAPISetJSON } from 'papupata-extractor'
import { JSONAPISet } from '../../common-types'
import { locator } from './locator'

export function generatePapudoc(configOrConfigFile?: string | PapudocConfig) {
  const config: PapudocConfig =
    !configOrConfigFile || typeof configOrConfigFile === 'string' ? loadConfig(configOrConfigFile) : configOrConfigFile

  const analysisSet = config.sourceFiles.map((filename) => {
    let moduleFilename = getRequireableFilename(config.baseDir || process.cwd(), filename)
    return generateAPISetJSON(
      {
        moduleFilename,
        tsConfigFilename: config.tsConfigFilename,
        baseDir: config.baseDir!
      },
      locator(moduleFilename)
    )
  })

  const analysis = combineAnalysis(analysisSet)
  generateFront(path.resolve(process.cwd(), config.baseDir || '', config.outDir || './papudoc'), analysis)

  if (config.JSONOutput) {
    const jsonFile = (process.cwd(), config.baseDir || '', config.JSONOutput)
    fs.writeFileSync(jsonFile, JSON.stringify(analysis, null, 2), 'utf8')
  }
}

function combineAnalysis(analysisSet: JSONAPISet[]) {
  return ([] as JSONAPISet).concat(...analysisSet)
}

export const papudoc = handlePapudoc
