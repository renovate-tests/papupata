import React, { useCallback, useMemo } from 'react'
import { API } from '../../../typedAPI'
import { useLiveEdit } from './LiveEditContext'

interface Props {
  field: API['query'][0]
}

export default function BooleanEditor({ field }: Props) {
  const cp = useMemo(() => ['request', 'pq', field.name], [field.name])
  const liveEdit = useLiveEdit(cp)

  const updateValue = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      liveEdit.setValue(e.target.value === 'true')
    },
    [liveEdit]
  )

  return (
    <select value={(!!liveEdit.value).toString()} onChange={updateValue}>
      <option value={'false'}>false</option>
      <option value={'true'}>true</option>
    </select>
  )
}
