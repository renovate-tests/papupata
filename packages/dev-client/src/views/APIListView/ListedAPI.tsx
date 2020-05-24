import { API } from '../../typedAPI'
import styled from 'styled-components'
import React, { useCallback } from 'react'
import navigate from '../../navigate'

interface Props {
  api: API
}

const Container = styled.div`
  background: #ffd0d0;
  margin: 20px 0;
  padding: 20px;
  transition: background-color 250ms linear;
  &:hover {
    background: #ffe0e0;
  }
`
const Title = styled.a`
  color: blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
const SmallTitle = styled.span`
  font-size: 0.8em;
`
const BigTitle = styled.span`
  font-size: 1.25em;
`
const Description = styled.div`
  margin-top: 10px;
`

export default function ListedAPI({ api }: Props) {
  const nameParts = api.name.split('.')
  const earlyParts = nameParts.slice(0, nameParts.length - 1).join('.') + (nameParts.length > 1 ? '.' : '')
  const myName = nameParts[nameParts.length - 1]

  const access = useCallback(() => navigate.toAPI(api.name), [api])
  return (
    <Container>
      <Title onClick={access}>
        <SmallTitle>{earlyParts}</SmallTitle>
        <BigTitle>{myName}</BigTitle>
      </Title>
      <Description>{api.description}</Description>
    </Container>
  )
}
