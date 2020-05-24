import { API } from '../../typedAPI'
import styled, { css } from 'styled-components'
import React, { useCallback } from 'react'
import navigate from '../../navigate'
import { useRoute } from 'react-router5'

interface Props {
  api: API
}

const Container = styled.div``
const Link = styled.a<{ selected: boolean }>`
  color: blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  ${({ selected }) =>
    !selected
      ? ''
      : css`
          font-weight: bold;
        `}
`

export default function NavAPI({ api }: Props) {
  const selectedAPI = useRoute().route?.params?.apiName
  const nameParts = api.name.split('.')
  const myName = nameParts[nameParts.length - 1]

  const access = useCallback(() => navigate.toAPI(api.name), [api])
  return (
    <Container>
      <Link selected={selectedAPI === api.name} onClick={access}>
        {myName}
      </Link>
    </Container>
  )
}
