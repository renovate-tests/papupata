import { JSONApiType } from 'papudoc/dist/jsonAPI'
import React, { createContext, ReactNode, useContext, useMemo } from 'react'

type Context = Map<string, JSONApiType>

const namedTypeContext = createContext<Context>(new Map())

interface Props {
  namedTypes: JSONApiType[]
  children: ReactNode
}

export function NamedTypeProvider({ namedTypes, children }: Props) {
  const existingTypes = useContext(namedTypeContext)

  const allNamedTypes = useMemo(() => {
    const existing: Array<[string, JSONApiType]> = [...existingTypes.entries()]
    const additions: Array<[string, JSONApiType]> = namedTypes.map((type) => [type.name, type])
    return new Map<string, JSONApiType>([...existing, ...additions])
  }, [namedTypes, existingTypes])

  return <namedTypeContext.Provider value={allNamedTypes}>{children}</namedTypeContext.Provider>
}
