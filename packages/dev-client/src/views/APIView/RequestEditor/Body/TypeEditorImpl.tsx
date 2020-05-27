import { TypeEditorProps } from './TypeEditorContext'
import React from 'react'
import StringEditor from './TypeEditors/StringEditor'
import TypeNamingWrapper from './TypeEditors/TypeNamingWrapper'
import ObjectEditor from './TypeEditors/ObjectEditor'

export default function TypeEditorImpl({ type }: TypeEditorProps) {
  switch (type.type) {
    case 'typeNamingWrapper':
      return <TypeNamingWrapper type={type} />
    case 'string':
      return <StringEditor />
    case 'object':
      return <ObjectEditor type={type} />
    default:
      return <div>Not supported: {type.type}</div>
  }
}
