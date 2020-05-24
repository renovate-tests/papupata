import React, { ReactNode, useMemo, useState, useCallback } from 'react'
import Loading from '../../components/Loading'
import TopLayout from '../../layouts/TopLayout'
import RouteComponent, { routeComponentContext } from '../../RouteComponent'
import AuthForm from './AuthForm'
import useAuthenticationStatus, { AuthenticationStatus } from './utils/useAuthenticationStatus'

export default function AuthenticationVerifier({ children }: { children: ReactNode }) {
  const [retryKey, setRetryKey] = useState(0)
  const authenticationStatus = useAuthenticationStatus(retryKey)

  const handleRetry = useCallback(() => setRetryKey((key) => key + 1), [])

  const AuthComponent = authenticationStatus === AuthenticationStatus.PENDING ? Loading : AuthForm

  const components = useMemo(() => {
    const Component = AuthComponent
    return [TopLayout, () => <Component retryAuth={handleRetry} />]
  }, [AuthComponent, handleRetry])

  if (authenticationStatus === AuthenticationStatus.AUTHENTICATED) {
    return <>{children}</>
  } else {
    return (
      <routeComponentContext.Provider value={components}>
        <RouteComponent />
      </routeComponentContext.Provider>
    )
  }
}
