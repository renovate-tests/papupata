import React, { createContext, useContext } from 'react'
import { JSONApiType } from 'papudoc/dist/jsonAPI'

export interface TypeEditorProps {
  type: JSONApiType
  setupDefaultValue: boolean
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
