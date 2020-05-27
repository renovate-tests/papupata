import React, { ReactNode } from 'react'
import { useLiveEdit } from '../LiveEditContext'

interface Props {
  children: ReactNode
}

export default function OptionalFieldWrapper({ children }: Props) {
  const { value } = useLiveEdit([])
  if (value === undefined) {
    return <div>[optional missing] {children}</div>
  } else {
    return <div>[optional present] {children}</div>
  }
}
