import { useAPI } from '../useAPI'
import { useMemo } from 'react'
import React from 'react'
import PQFieldEditor from './PQFieldEditor'

export default function ParamAndQueryEditor() {
  const api = useAPI()

  const editables = useMemo(() => {
    if (!api) return null
    return [
      ...api.pathParams.map((param) => ({ name: param.name, optional: false, type: 'string' as const })),
      ...api.query,
    ]
  }, [api])

  return (
    <>
      {editables?.map((editable) => (
        <PQFieldEditor key={editable.name} field={editable} />
      ))}
    </>
  )
}
