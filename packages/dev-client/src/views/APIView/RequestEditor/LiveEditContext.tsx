import React, { createContext, ReactNode, useState, useCallback, useContext, useMemo } from 'react'
import { getStore, mutateStore } from '../../../utils/store'
import get from 'lodash/get'
import set from 'lodash/set'

interface LiveEditContext {
  path: string[]
  version: number

  incrementVersion(): void
}

const liveEditContext = createContext<LiveEditContext>(null as any)

interface ProviderProps {
  children: ReactNode
  path: string[]
}
interface NestedProviderProps {
  children: ReactNode
  addToPath: string
}

const noVars = {}
const bodyVars = { $REQFIELD: 'body' }
const bodyOptionsVars = { $REQFIELD: 'bodyOptions' }

export function LiveEditProvider({ children, path }: ProviderProps) {
  const [version, setVersion] = useState(0)
  const incrementVersion = useCallback(() => setVersion((v) => v + 1), [])
  return <liveEditContext.Provider value={{ version, incrementVersion, path }}>{children}</liveEditContext.Provider>
}

export function NestedLiveEditProvider({ children, addToPath }: NestedProviderProps) {
  const parent = useContext(liveEditContext)
  const parentPath = parent.path
  const myPath = useMemo(() => [...parentPath, addToPath], [parentPath, addToPath])
  return <liveEditContext.Provider value={{ ...parent, path: myPath }}>{children}</liveEditContext.Provider>
}

export function useLiveEdit<ValueType = any>(variables: { [varName: string]: string }, childPath?: string[]) {
  const lec = useContext(liveEditContext)

  return useMemo(() => {
    const path = [...lec.path, ...(childPath || [])].map((entry) => variables[entry] || entry)
    const value = get(getStore(), path) as ValueType | undefined
    const setValue = (newValue: ValueType) => {
      mutateStore((store) => set(store, path, newValue))
      lec.incrementVersion()
    }

    return { value, setValue }
  }, [lec, childPath, variables])
}

export function useGenericLiveEdit<T = any>(childPath?: string[]) {
  return useLiveEdit<T>(noVars, childPath)
}

export function useBodyLiveEdit<T>() {
  return useLiveEdit<T>(bodyVars)
}
export function useBodyOptionsLiveEdit<T>() {
  return useLiveEdit<T>(bodyOptionsVars)
}
