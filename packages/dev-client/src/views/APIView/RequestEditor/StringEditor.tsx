import { ReactNode, useCallback, useMemo } from 'react'
import { API } from '../../../typedAPI'
import React from 'react'
import { useLiveEdit } from './LiveEditContext'

interface Props {
  field: API['query'][0]
}

export default function StringEditor({ field }: Props) {
  const cp = useMemo(() => ['request', 'pq', field.name], [field.name])
  const liveEdit = useLiveEdit(cp)

  const updateValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      liveEdit.setValue(e.target.value)
    },
    [liveEdit]
  )

  return <input value={liveEdit.value || ''} onChange={updateValue} />
}
