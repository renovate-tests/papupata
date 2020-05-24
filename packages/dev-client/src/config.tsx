import { createContext, ReactNode, useContext } from 'react'
import defaultConfig from './data/defaultConfig'
import React from 'react'

export type ResponseHandling = null | 'useAsToken' | { type: 'useFieldAsToken'; field: string }
type LoginMechanism =
  | null
  | {
      type: 'loginForm'
      path: string
      usernameField: string
      passwordField: string
      responseHandling: ResponseHandling
    }
  | 'tokenForm'
  | 'basicAuthForm'
type TokenDeliveryMechanism = 'cookie' | { type: 'header'; headerName: string } | 'basicAuth' | 'bearerAuth'

type AuthenticationVariants = null | {
  type: 'required'
  tokenDeliveryMechanism: TokenDeliveryMechanism
  verifyAuthUsing: {
    path: string
    method: string
  }
  loginMechanism: LoginMechanism
}

export interface Config {
  authentication: AuthenticationVariants
}

const configContext = createContext<Config>(null as any)

export function DefaultConfigProvider({ children }: { children: ReactNode }) {
  return <configContext.Provider value={defaultConfig}>{children}</configContext.Provider>
}

export function useConfig() {
  return useContext(configContext)
}
