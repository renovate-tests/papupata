import { TypeEditorProps } from './TypeEditorContext'
import React, { ReactNode } from 'react'
import StringEditor from './TypeEditors/StringEditor'
import TypeNamingWrapper from './TypeEditors/TypeNamingWrapper'
import ObjectEditor from './TypeEditors/ObjectEditor'
import DefaultValueInserter from './DefaultValueInserter'

export default function TypeEditorImpl({ type, setupDefaultValue }: TypeEditorProps) {
  switch (type.type) {
    case 'typeNamingWrapper':
      return <TypeNamingWrapper type={type} setupDefaultValue={setupDefaultValue} />
    case 'string':
      return defaultValueWrapper(<StringEditor />,  '')
    case 'object':
      return defaultValueWrapper(<ObjectEditor type={type} />,  {})
    default:
      return <div>Not supported: {type.type}</div>
  }

  function defaultValueWrapper<T extends ReactNode>(editor: T, defaultValue: any) {
    if (!setupDefaultValue) return editor
    return <DefaultValueInserter defaultValue={defaultValue}>{editor}</DefaultValueInserter>
  }
}
