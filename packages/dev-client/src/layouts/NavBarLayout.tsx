import styled from 'styled-components'
import RouteComponent from '../RouteComponent'
import React from 'react'

const Container = styled.div`
  display: flex;
`
const NavMenu = styled.div`
  width: 300px;
`
const Border = styled.div`
  align-self: stretch;
  width: 4px;
`
const BorderInner = styled.div`
  border-right: 4px solid darkgray;
  align-self: stretch;
  position: fixed;
  width: 4px;
  box-sizing: border-box;
  top: 80px;
  bottom: 20px;
`

const Content = styled.div`
  margin-left: 30px;
  flex-grow: 1;
`

export default function NavBarLayout() {
  return (
    <Container>
      <NavMenu>
        <RouteComponent />
      </NavMenu>
      <Border>
        <BorderInner />
      </Border>
      <Content>
        <RouteComponent skip={1} />
      </Content>
    </Container>
  )
}
