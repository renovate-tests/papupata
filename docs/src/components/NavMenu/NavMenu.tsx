import React from 'react'
import styled from 'styled-components'
import NavEntry from './NavEntry'

const Container = styled.div`
  border-right: 1px solid #aaa;
  margin-right: 30px;
  padding-right: 30px;
  padding-left: 30px;
  margin-top: 30px;
`
const Heading = styled.h2``

const Indent = styled.div`
  margin-left: 20px;
`

export default function NavMenu() {
  return (
    <Container>
      <Heading>Table of contents</Heading>
      <NavEntry link="/what-is-papupata">What is papupata?</NavEntry>
      <NavEntry link="/getting-started">Getting started</NavEntry>
      <NavEntry link="/api-reference">API Reference</NavEntry>
      <Indent>
        <NavEntry link="/api/APIDeclaration">class APIDeclaration</NavEntry>
        <Indent>
          <NavEntry link="/api/APIDeclaration/configure">configure()</NavEntry>
          <NavEntry link="/api/APIDeclaration/declareDeleteAPI">declareDeleteAPI()</NavEntry>
          <NavEntry link="/api/APIDeclaration/declareGetAPI">declareGetAPI()</NavEntry>
          <NavEntry link="/api/APIDeclaration/declarePostAPI">declarePostAPI()</NavEntry>
          <NavEntry link="/api/APIDeclaration/declarePutAPI">declarePutAPI()</NavEntry>

        </Indent>
      </Indent>
    </Container>
  )
}
