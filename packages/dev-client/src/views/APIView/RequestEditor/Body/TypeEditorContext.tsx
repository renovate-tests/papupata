import { createContext, useContext } from 'react'
import React from 'react'
import { AnyType } from '../../../../typedAPI'

export interface TypeEditorProps {
  type: AnyType
}
/*
interface Ctx {
  Component: React.FC<TypEditorProps>
}*/
type Ctx = React.FC<TypeEditorProps>
export const typeEditorContext = createContext<Ctx>(null as any)

export function TypeEditor(props: TypeEditorProps) {
  const Component = useContext(typeEditorContext)

  return <Component {...props} />
}
