import { useBodyLiveEdit } from '../../LiveEditContext'
import React, { useEffect } from 'react'

export default function UndefinedEditor() {
  const liveEdit = useBodyLiveEdit()
  useEffect(() => {
    if (liveEdit.value !== undefined) {
      liveEdit.setValue(undefined)
    }
  }, [liveEdit])
  return <span>undefined</span>
}
