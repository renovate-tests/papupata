import { Config } from '../config'
import { getStore } from './store'

const base64Encode = btoa

export default function getAuthHeaders(config: Config): any {
  const tokenDelivery = config.authentication?.tokenDeliveryMechanism

  if (!tokenDelivery || tokenDelivery === 'cookie') return {}
  if (tokenDelivery === 'bearerAuth') {
    return {
      Authorization: 'Bearer ' + getStore().authentication?.token,
    }
  }
  if (tokenDelivery === 'basicAuth') {
    return {
      Authorization:
        'Basic ' + base64Encode(getStore().authentication?.username + ':' + getStore().authentication?.password),
    }
  }
  if (tokenDelivery.type === 'header') {
    return {
      [tokenDelivery.headerName]: getStore().authentication?.token,
    }
  }
  throw new Error('Token delivery mehcanism not supported')
}
