import { API } from '../../typedAPI'
import styled from 'styled-components'
import React, { useCallback } from 'react'
import navigate from '../../navigate'

interface Props {
  api: API
}

const Container = styled.div``
const Link = styled.a`
  color: blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export default function NavAPI({ api }: Props) {
  const nameParts = api.name.split('.')
  const myName = nameParts[nameParts.length - 1]

  const access = useCallback(() => navigate.toAPI(api.name), [api])
  return (
    <Container>
      <Link onClick={access}>{myName}</Link>
    </Container>
  )
}
