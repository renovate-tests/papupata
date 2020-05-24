import React, { createContext, ReactNode } from 'react'
import { APISet } from './typedAPI'
import exampleAPI from './data/exampleAPI'

export const apiContext = createContext<APISet>(null as any)

export function APIProvider({ children }: { children: ReactNode }) {
  return <apiContext.Provider value={exampleAPI}>{children}</apiContext.Provider>
}
