import { ReactNode } from 'react'
import { typeEditorContext } from './TypeEditorContext'
import React from 'react'
import TypeEditorImpl from './TypeEditorImpl'

export default function TypeEditorProvider({ children }: { children: ReactNode }) {
  return <typeEditorContext.Provider value={TypeEditorImpl}>{children}</typeEditorContext.Provider>
}
