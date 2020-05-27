import React, { useMemo } from 'react'
import { API } from '../../../typedAPI'
import OptionalWrapper from './OptionalWrapper'
import StringEditor from './StringEditor'
import BooleanEditor from './BooleanEditor'

interface Props {
  field: API['query'][0]
}

const editors: { [key: string]: React.FC<Props> } = {
  string: StringEditor,
  boolean: BooleanEditor,
}

export default function PQFieldEditor({ field }: Props) {
  const Editor = editors[field.type]
  const liveEditPath = useMemo(() => ['request', 'pq', field.name], [field.name])
  if (!Editor) return <div>No editor for {field.type}</div>
  return (
    <div>
      {field.name}

      <OptionalWrapper isRequired={!field.optional} liveEditPath={liveEditPath}>
        <Editor field={field} />
      </OptionalWrapper>
    </div>
  )
}

