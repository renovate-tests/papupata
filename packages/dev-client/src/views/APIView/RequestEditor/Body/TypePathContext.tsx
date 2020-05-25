import { createContext, useContext, useMemo } from 'react'
import { useLiveEdit } from '../LiveEditContext'

type Ctx = string[]

export const typePathContext = createContext<Ctx>([])

export function useLiveEditTypePath() {
  const ctxPath = useContext(typePathContext)
  return useMemo(() => ['request', 'body', ...ctxPath], [ctxPath])
}

export function useTypeEditOptions<OptionsType extends Object>(defaultValue: OptionsType) {
  const ctxPath = useContext(typePathContext)
  const path = useMemo(() => ['request', 'bodyOptions', ...ctxPath], [ctxPath])
  const editable = useLiveEdit(path)

  const defaultedValue = useMemo(() => ({ ...defaultValue, ...(editable.value || {}) }), [defaultValue, editable.value])
  return useMemo(() => {
    return { value: defaultedValue, setValue: editable.setValue }
  }, [defaultedValue, editable])
}
