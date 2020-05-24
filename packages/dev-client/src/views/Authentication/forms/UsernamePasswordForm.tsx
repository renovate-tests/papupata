import React, { createRef, useCallback, useState } from 'react'
import { PageHeader } from '../../../commonStyles'
import useAutoFocusInput from '../../../utils/useAutoFocusInput'
import { form } from './common'

interface Props {
  onSubmit(username: string, password: string): void
}

export default function UsernamePasswordForm({ onSubmit }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const updateUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value), [])
  const updatePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [])

  const usernameRef = createRef<HTMLInputElement>()
  useAutoFocusInput(usernameRef)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(username, password)
    },
    [username, password, onSubmit]
  )

  return (
    <>
      <PageHeader>Log in</PageHeader>
      <p>Please enter your credentials.</p>
      <form onSubmit={handleSubmit}>
        <form.Entry>
          <form.FormLabel>Username</form.FormLabel>
          <form.FormInput ref={usernameRef} onChange={updateUsername} value={username} />
        </form.Entry>
        <form.Entry>
          <form.FormLabel>Password</form.FormLabel>
          <form.FormInput onChange={updatePassword} value={password} />
        </form.Entry>
        <form.Submit>Log in</form.Submit>
      </form>
    </>
  )
}
