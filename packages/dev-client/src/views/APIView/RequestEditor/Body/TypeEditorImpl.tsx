import { TypeEditorProps } from './TypeEditorContext'
import React, { ReactNode } from 'react'
import StringEditor from './TypeEditors/StringEditor'
import TypeNamingWrapper from './TypeEditors/TypeNamingWrapper'
import ObjectEditor from './TypeEditors/ObjectEditor'
import DefaultValueInserter from './DefaultValueInserter'
import NumberEditor from './TypeEditors/NumberEditor'
import BooleanEditor from './TypeEditors/BooleanEditor'
import UndefinedEditor from './TypeEditors/UndefinedEditor'
import NonEditor from './TypeEditors/NonEditor'
import UnionEditor from './TypeEditors/UnionEditor'

export default function TypeEditorImpl({ type, setupDefaultValue }: TypeEditorProps) {
  switch (type.type) {
    case 'typeNamingWrapper':
      return <TypeNamingWrapper type={type} setupDefaultValue={setupDefaultValue} />
    case 'string':
      return defaultValueWrapper(<StringEditor />, '')
    case 'number':
      return defaultValueWrapper(<NumberEditor />, 0)
    case 'boolean':
      return defaultValueWrapper(<BooleanEditor />, false)
    case 'object':
      return defaultValueWrapper(<ObjectEditor type={type} />, {})
    case 'undefined':
    case 'never':
    case 'void':
      return <UndefinedEditor />
    case 'null':
      return defaultValueWrapper(<NonEditor value={null} label={'null'} allowSet={!setupDefaultValue} />, null)
    case 'stringLiteral':
    case 'numberLiteral':
    case 'booleanLiteral':
      return defaultValueWrapper(
        <NonEditor value={type.value} label={type.value} allowSet={!setupDefaultValue} />,
        type.value
      )
    case 'union':
      return <UnionEditor type={type} required={setupDefaultValue} />
    default:
      return <div>Not supported: {type.type}</div>
  }

  function defaultValueWrapper<T extends ReactNode>(editor: T, defaultValue: any) {
    if (!setupDefaultValue) return editor
    return <DefaultValueInserter defaultValue={defaultValue}>{editor}</DefaultValueInserter>
  }
}
