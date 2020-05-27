import { Config } from '../config'

const defaultConfig: Config = {
  baseURL: '',
  authentication: null,
  suggestedHeaders: [
    { name: 'Content-Type', value: 'application/json' },
    { name: 'Accept', value: 'application/json' },
  ],
  apiURL: '/',
}

export default defaultConfig
