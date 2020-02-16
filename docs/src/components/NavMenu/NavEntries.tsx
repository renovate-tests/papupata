import { ReactNode } from 'react'

interface ComplexNavEntry {
  label: ReactNode
  children?: NavEntries
}

export type NavEntry = ReactNode | ComplexNavEntry

export interface NavEntries {
  [url: string]: NavEntry
}
