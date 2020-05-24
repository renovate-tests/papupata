import React, { useCallback } from 'react'
import { mutateStore } from '../../../utils/store'
import UsernamePasswordForm from './UsernamePasswordForm'

interface Props {
  retryAuth(): void
}

export default function BasicAuthForm({ retryAuth }: Props) {
  const handleSubmit = useCallback(
    (username: string, password: string) => {
      mutateStore((store) => {
        store.authentication = { username, password }
      })

      retryAuth()
    },
    [retryAuth]
  )

  return <UsernamePasswordForm onSubmit={handleSubmit} />
}
