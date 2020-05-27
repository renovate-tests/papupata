import { useLiveEdit } from '../../LiveEditContext'
import React, { useCallback } from 'react'

export default function BooleanEditor() {
  const liveEdit = useLiveEdit()

  const effectiveValue = typeof liveEdit.value !== 'boolean' ? 'undefined' : liveEdit.value.toString()

  const updateValue = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => liveEdit.setValue(e.target.value === 'true'),
    [liveEdit]
  )
  return (
    <select onChange={updateValue} value={effectiveValue}>
      {effectiveValue === 'undefined' && <option value={'undefined'}>Not selected</option>}
      <option value={'false'}>False</option>
      <option value={'true'}>True</option>
    </select>
  )
}
