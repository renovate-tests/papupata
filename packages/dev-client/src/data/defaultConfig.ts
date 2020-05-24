import { Config } from '../config'

const defaultConfig: Config = {
  authentication: null,
  suggestedHeaders: [
    { name: 'Content-Type', value: 'application/json' },
    { name: 'Accept', value: 'application/json' },
  ],
}

export default defaultConfig
