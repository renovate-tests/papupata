import { TypeNamingWrapper as JsonAPITypeNamingWrapper } from 'papudoc/dist/jsonAPI'
import { TypeEditor } from '../TypeEditorContext'
import { NamedTypeProvider } from '../../NamedTypeContext'
import React from 'react'

interface Props {
  type: JsonAPITypeNamingWrapper
}

export default function TypeNamingWrapper({ type }: Props) {
  return (
    <NamedTypeProvider namedTypes={type.namedTypes}>
      <TypeEditor type={type.mainType} />
    </NamedTypeProvider>
  )
}
