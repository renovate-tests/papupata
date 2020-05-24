import React, { useMemo } from 'react'
import { LiveEditProvider } from './LiveEditContext'
import ParamAndQueryEditor from './ParamAndQueryEditor'
import { useAPI } from '../useAPI'

export default function RequestEditor() {
  const api = useAPI()

  const path = useMemo(() => ['apis', api?.name ?? '', 'currentRequest'], [api])
  if (!api) return null
  return (
    <LiveEditProvider path={path}>
      <ParamAndQueryEditor />
    </LiveEditProvider>
  )
}
