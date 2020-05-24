import { PageHeader } from '../../../commonStyles'
import React, { useState, useCallback, createRef, useEffect } from 'react'
import { form } from './common'
import { mutateStore } from '../../../utils/store'

interface Props {
  retryAuth(): void
}

export default function TokenInputForm({ retryAuth }: Props) {
  const [token, setToken] = useState('')

  const updateState = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value), [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      mutateStore((store) => {
        store.authentication = { token }
      })

      retryAuth()
    },
    [token, retryAuth]
  )

  const inputRef = createRef<HTMLInputElement>()

  useEffect(() => {
    inputRef.current?.focus()
  }, [!!inputRef.current])

  return (
    <>
      <PageHeader>Log in</PageHeader>
      <p>Please enter your authentication token.</p>
      <form onSubmit={handleSubmit}>
        <form.Entry>
          <form.FormLabel>Token</form.FormLabel>
          <form.FormInput ref={inputRef} style={{ minWidth: '600px' }} onChange={updateState} value={token} />
        </form.Entry>
        <form.Submit>Log in</form.Submit>
      </form>
    </>
  )
}
