import { analyze } from './analyzer'
import generateFront from './generateFront'
import { PapudocConfig } from './config'
import generateJsonOutput from './generateJsonOutput'
import * as fs from 'fs'

const filename = __dirname + '/demo/api.ts'
const config: PapudocConfig = {
  sourceFiles: [filename],
  baseDir: __dirname + '/..',
  outDir: 'output',
}
fs.writeFileSync(
  __dirname + '/../output/demoapi.json',
  JSON.stringify(generateJsonOutput(analyze(config, filename)), null, 2),
  'utf8'
)
generateFront(__dirname + '/../output', analyze(config, filename))
