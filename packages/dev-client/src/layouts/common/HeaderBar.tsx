import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  background: darkred;
  height: 60px;
  color: white;
  font-size: 26px;
  font-family: Verdana;
  padding-left: 32px;
  align-items: center;
  margin: 0;
`

export default function HeaderBar() {
  return <Header>Papupata client tool</Header>
}

export function FakeHeader() {
  return <Header />
}
