import React from 'react'
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
  if (!Editor) return <div>No editor for {field.type}</div>
  return (
    <div>
      {field.name}

      <OptionalWrapper field={field}>
        <Editor field={field} />
      </OptionalWrapper>
    </div>
  )
}
