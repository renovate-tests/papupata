import RouteComponent from '../RouteComponent'
import React from 'react'
import HeaderBar, { FakeHeader } from './common/HeaderBar'
import ContentContainer from './common/ContentContainer'
import styled from 'styled-components'

const ColProvider = styled.div`
  display: flex;
`

const Side = styled.div`
  flex-grow: 1;
  background: #fafafa;
  border-left: 2px solid #d0d0d0;
  border-right: 2px solid #d0d0d0;
`
const Middle = styled.div`
  width: 100%;
  max-width: 1400px;
`

const MiddleInsideHeader = styled.div`
  padding: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`

export default function TopLayout() {
  return (
    <ColProvider>
      <Side>
        <FakeHeader />
      </Side>
      <Middle>
        <HeaderBar />
        <MiddleInsideHeader>
          <ContentContainer>
            <RouteComponent />
          </ContentContainer>
        </MiddleInsideHeader>
      </Middle>
      <Side>
        <FakeHeader />
      </Side>
    </ColProvider>
  )
}
