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

export function LiveEditProvider({ children, path }: ProviderProps) {
  const [version, setVersion] = useState(0)
  const incrementVersion = useCallback(() => setVersion((v) => v + 1), [])
  return <liveEditContext.Provider value={{ version, incrementVersion, path }}>{children}</liveEditContext.Provider>
}

export function useLiveEdit<ValueType = any>(childPath: string[]) {
  const lec = useContext(liveEditContext)

  return useMemo(() => {
    const value = get(getStore(), [...lec.path, ...childPath]) as (ValueType | undefined)
    const setValue = (newValue: ValueType) => {
      mutateStore((store) => set(store, [...lec.path, ...childPath], newValue))
      lec.incrementVersion()
    }

    return { value, setValue }
  }, [lec, childPath])
}
