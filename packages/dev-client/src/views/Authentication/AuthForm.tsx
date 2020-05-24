import React from 'react'
import { useConfig } from '../../config'
import ForbiddenView from './forms/ForbiddenView'
import TokenInputForm from './forms/TokenInputForm'
import BasicAuthForm from './forms/BasicAuthForm'
import LoginForm from './forms/LoginForm'

interface Props {
  retryAuth: () => void
}

export default function AuthForm({ retryAuth }: Props) {
  const config = useConfig()
  const loginMechanism = config.authentication?.loginMechanism

  if (!loginMechanism) return <ForbiddenView />
  if (loginMechanism === 'tokenForm') return <TokenInputForm retryAuth={retryAuth} />
  if (loginMechanism === 'basicAuthForm') return <BasicAuthForm retryAuth={retryAuth} />
  if (loginMechanism.type === 'loginForm') return <LoginForm retryAuth={retryAuth} />

  throw new Error('Unhandled login mechanism type')
}
