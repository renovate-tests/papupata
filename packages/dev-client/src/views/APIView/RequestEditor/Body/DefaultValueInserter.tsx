import React, { ReactNode, useEffect } from 'react'
import { useLiveEdit } from '../LiveEditContext'
import Loading from '../../../../components/Loading'

interface Props {
  defaultValue: any
  children: ReactNode
}

export default function DefaultValueInserter({ defaultValue, children }: Props) {
  const liveEdit = useLiveEdit([])
  useEffect(() => {
    if (liveEdit.value === undefined) {
      liveEdit.setValue(defaultValue)
    }
  }, [liveEdit, defaultValue])

  if (liveEdit.value === undefined) return <Loading />
  return <>{children}</>
}
