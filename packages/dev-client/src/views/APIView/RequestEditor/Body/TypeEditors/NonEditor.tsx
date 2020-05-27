import { useLiveEdit } from '../../LiveEditContext'
import React, { ReactNode, useCallback } from 'react'

interface Props {
  label: ReactNode
  value: any
  allowSet: boolean
}

export default function NonEditor({ label, value, allowSet }: Props) {
  const liveEdit = useLiveEdit()

  const effectiveValue = typeof liveEdit.value !== 'number' ? '0' : liveEdit.value.toString()

  const setValue = useCallback(() => liveEdit.setValue(parseFloat(value)), [liveEdit, value])

  return (
    <span>
      {label}
      {allowSet && value !== liveEdit.value && <button onClick={setValue}>Apply</button>}
    </span>
  )
}
