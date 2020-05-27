import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import defaultConfig from './data/defaultConfig'
import React from 'react'
import Loading from './components/Loading'

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
  baseURL: string
  apiURL: string
  authentication: AuthenticationVariants
  suggestedHeaders?: Array<{ name: string; value: string }>
  csrfToken?: null | { path: string; field: string }
}

const configContext = createContext<Config>(null as any)

export function DefaultConfigProvider({ children }: { children: ReactNode }) {
  return <configContext.Provider value={defaultConfig}>{children}</configContext.Provider>
}

export function useConfig() {
  return useContext(configContext)
}

interface FetchedConfigProviderProps {
  children: ReactNode
  source: string
}

export function FetchedConfigProvider({ children, source }: FetchedConfigProviderProps) {
  const [config, setConfig] = useState<Config | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const resp = await fetch(source, {
          headers: {
            Accept: 'application/json',
          },
        })
        if (resp.status !== 200) {
          setError((await resp.text()) || resp.statusText)
        } else {
          setConfig(await resp.json())
        }
      } catch (err) {
        setError(err.message)
      }
    })()
  }, [source])

  if (error) return <div>{error}</div>
  if (!config) return <Loading />

  return <configContext.Provider value={config}>{children}</configContext.Provider>
}
