import { TypeEditorProps } from './TypeEditorContext'
import React from 'react'
import StringEditor from './TypeEditors/StringEditor'

export default function TypeEditorImpl({ type}: TypeEditorProps) {
  switch(type.type) {
    case 'string':
      return <StringEditor />
    default:
      return <div>Not supported: {type.type}</div>
  }
}
