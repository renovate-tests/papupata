import { useBodyLiveEdit } from '../../LiveEditContext'
import React, { useCallback } from 'react'

export default function NumberEditor() {
  const liveEdit = useBodyLiveEdit()

  const effectiveValue = typeof liveEdit.value !== 'number' ? '0' : liveEdit.value.toString()

  const updateValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => liveEdit.setValue(parseFloat(e.target.value)),
    [liveEdit]
  )
  return <input type={'number'} value={effectiveValue} onChange={updateValue} />
}
