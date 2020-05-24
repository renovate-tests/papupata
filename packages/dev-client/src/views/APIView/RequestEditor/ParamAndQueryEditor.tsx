import { useAPI } from '../useAPI'
import { useMemo } from 'react'
import React from 'react'
import PQFieldEditor from './PQFieldEditor'
import { Section, SectionHeader } from './common'

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
    <Section>
      <SectionHeader>Query and path parameters</SectionHeader>
      {editables?.map((editable) => (
        <PQFieldEditor key={editable.name} field={editable} />
      ))}
    </Section>
  )
}
