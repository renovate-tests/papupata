import { useLiveEdit } from '../../LiveEditContext'
import React, { useEffect } from 'react'

export default function UndefinedEditor() {
  const liveEdit = useLiveEdit()
  useEffect(() => {
    if (liveEdit.value !== undefined) {
      liveEdit.setValue(undefined)
    }
  }, [liveEdit])
  return <span>undefined</span>
}
