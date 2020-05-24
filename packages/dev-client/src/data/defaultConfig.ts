import { Config } from '../config'

const defaultConfig: Config = {
  authentication: {
    type: 'required',
    verifyAuthUsing: {
      path: '/somepath',
      method: 'GET',
    },
    tokenDeliveryMechanism: 'basicAuth',
    loginMechanism: {
      type: 'loginForm',
      path: '/login',
      usernameField: 'user',
      passwordField: 'pass',
      responseHandling: null,
    },
  },
}

export default defaultConfig
