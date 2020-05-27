import { createContext, useMemo } from 'react'
import { useBodyOptionsLiveEdit } from '../LiveEditContext'

type Ctx = string[]

export const typePathContext = createContext<Ctx>([])

export function useTypeEditOptions<OptionsType extends Object>(defaultValue: OptionsType) {
  const editable = useBodyOptionsLiveEdit<OptionsType>()

  const defaultedValue = useMemo(() => ({ ...defaultValue, ...(editable.value || {}) }), [defaultValue, editable.value])
  return useMemo(() => {
    return { value: defaultedValue, setValue: editable.setValue }
  }, [defaultedValue, editable])
}
