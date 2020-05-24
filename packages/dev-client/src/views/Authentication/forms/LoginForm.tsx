import React, { useCallback } from 'react'
import { mutateStore } from '../../../utils/store'
import UsernamePasswordForm from './UsernamePasswordForm'
import useLatest from '../../../utils/useLatest'
import { useConfig, ResponseHandling } from '../../../config'
import { Awaited } from '../../../types'

interface Props {
  retryAuth(): void
}

export default function LoginForm({ retryAuth }: Props) {
  const createLatest = useLatest()
  const login = useLogin()
  const handleSubmit = useCallback(
    (username: string, password: string) => {
      const latest = createLatest()
      login(username, password).then(() => {
        if (latest()) {
          mutateStore((store) => {
            store.authentication = { username, password }
          })

          retryAuth()
        }
      })
    },
    [retryAuth]
  )

  return <UsernamePasswordForm onSubmit={handleSubmit} />
}

function useLogin() {
  const config = useConfig()
  return useCallback(
    async (username: string, password: string) => {
      const login = config.authentication?.loginMechanism
      if (!login || typeof login !== 'object' || login.type !== 'loginForm') throw new Error('Invalid state')

      const response = await makeLoginRequest(login.path, login.usernameField, username, login.passwordField, password)
      await handleResponse(login.responseHandling, response)
    },
    [config]
  )
}

function makeLoginRequest(
  path: string,
  usernameField: string,
  username: string,
  passwordField: string,
  password: string
) {
  const body = JSON.stringify({
    [usernameField]: username,
    [passwordField]: password,
  })
  return fetch(path, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}

async function handleResponse(handling: ResponseHandling, response: Awaited<ReturnType<typeof fetch>>) {
  if (response.status >= 300) {
    throw new Error('Login failure')
  }
  if (handling === null) {
    return
  } else if (handling === 'useAsToken') {
    const token = await response.text()
    mutateStore((store) => {
      store.authentication = { token }
    })
  } else if (handling.type === 'useFieldAsToken') {
    const token = (await response.json())[handling.field]
    mutateStore((store) => {
      store.authentication = { token }
    })
  }
}
