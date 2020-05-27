import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { APISet } from './typedAPI'
import { useConfig } from './config'
import getCSRFHeader from './utils/getCSRFHeader'
import getAuthHeaders from './utils/getAuthHeaders'
import { JSONAPISet } from 'papudoc/dist/jsonAPI'
import Loading from './components/Loading'

export const apiContext = createContext<APISet>(null as any)

interface Props {
  children: ReactNode
}

export function APIProvider({ children }: Props) {
  const [api, setAPI] = useState<null | JSONAPISet>(null)
  const config = useConfig()

  useEffect(() => {
    getCSRFHeader(config)
      .then((csrfHeader) =>
        fetch(config.apiURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...getAuthHeaders(config),
            ...(csrfHeader || {}),
          },
        })
      )
      .then((resp) => resp.json())
      .then(setAPI)
  }, [config])

  if (!api) return <Loading />

  return <apiContext.Provider value={api}>{children}</apiContext.Provider>
}
