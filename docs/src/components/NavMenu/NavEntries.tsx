import { ReactNode } from 'react'

interface ComplexNavEntry {
  label: ReactNode
  children?: NavEntries
  description?: ReactNode
}

export type NavEntry = ReactNode | ComplexNavEntry

export interface NavEntries {
  [url: string]: NavEntry
}
