import { useState, useEffect } from 'react'
import { useConfig, Config } from '../../../config'
import getAuthHeaders from '../../../utils/getAuthHeaders'
import useLatest from '../../../utils/useLatest'

export enum AuthenticationStatus {
  PENDING,
  LOGIN_NEEDED,
  AUTHENTICATED,
}

export default function useAuthenticationStatus(retryKey?: number): AuthenticationStatus {
  const [status, setStatus] = useState(AuthenticationStatus.PENDING)
  const config = useConfig()
  const setLatest = useLatest()

  useEffect(() => {
    if (config.authentication === null) {
      setStatus(AuthenticationStatus.AUTHENTICATED)
    } else {
      const isLatest = setLatest()
      isAuthenticated(config).then((authenticated) => {
        if (!isLatest()) return
        setStatus(authenticated ? AuthenticationStatus.AUTHENTICATED : AuthenticationStatus.LOGIN_NEEDED)
      })
    }
  }, [config, retryKey, setLatest])

  return status
}

async function isAuthenticated(config: Config) {
  const checkMechanism = config.authentication?.verifyAuthUsing
  if (!checkMechanism) return false
  try {
    const req = await fetch(checkMechanism.path, {
      method: checkMechanism.method,
      headers: {
        Accept: 'application/json',
        ...getAuthHeaders(config),
      },
    })
    return req.status < 300
  } catch (err) {
    return false
  }
}
