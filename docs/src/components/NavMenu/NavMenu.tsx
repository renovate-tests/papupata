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

const Method: React.FC = ({ children }) => {
  return <span>{children}()</span>
}

const Type = styled.span`
  font-style: italic;
`

const Property = styled.span`
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
          <NavEntry link="/api/APIDeclaration/configure">
            <Method>configure</Method>
          </NavEntry>
          <NavEntry link="/api/APIDeclaration/declareDeleteAPI">
            <Method>declareDeleteAPI</Method>
          </NavEntry>
          <NavEntry link="/api/APIDeclaration/declareGetAPI">
            <Method>declareGetAPI</Method>
          </NavEntry>
          <NavEntry link="/api/APIDeclaration/declarePostAPI">
            <Method>declarePostAPI</Method>
          </NavEntry>
          <NavEntry link="/api/APIDeclaration/declarePutAPI">
            <Method>declarePutAPI</Method>
          </NavEntry>
          <NavEntry link="/api/APIDeclaration/unmockAll">
            <Method>unmockAll</Method>
          </NavEntry>
        </Indent>
        <NavEntry link="/api/IncompleteAPIDeclaration">IncompleteAPIDeclaration</NavEntry>
        <Indent>
          <NavEntry link="/api/IncompleteAPIDeclaration/params">
            <Method>params</Method>
          </NavEntry>
          <NavEntry link="/api/IncompleteAPIDeclaration/query">
            <Method>query</Method>
          </NavEntry>
          <NavEntry link="/api/IncompleteAPIDeclaration/optionalQuery">
            <Method>optionalQuery</Method>
          </NavEntry>
          <NavEntry link="/api/IncompleteAPIDeclaration/queryBool">
            <Method>queryBool</Method>
          </NavEntry>
          <NavEntry link="/api/IncompleteAPIDeclaration/body">
            <Method>body</Method>
          </NavEntry>
          <NavEntry link="/api/IncompleteAPIDeclaration/response">
            <Method>response</Method>
          </NavEntry>
        </Indent>
        <NavEntry link="/api/DeclaredAPI">DeclaredAPI</NavEntry>
        <Indent>
          <NavEntry link="/api/DeclaredAPI/invoke">
            <Method>invoke</Method>
          </NavEntry>
          <NavEntry link="/api/DeclaredAPI/getURL">
            <Method>getURL</Method>
          </NavEntry>
          <NavEntry link="/api/DeclaredAPI/implement">
            <Method>implement</Method>
          </NavEntry>
          <NavEntry link="/api/DeclaredAPI/implementation">
            <Property>implementation</Property>
          </NavEntry>
          <NavEntry link="/api/DeclaredAPI/implementWithMiddleware">
            <Method>implementWithMiddleware</Method>
          </NavEntry>
          <NavEntry link="/api/DeclaredAPI/mock">
            <Method>mock</Method>
          </NavEntry>
          <NavEntry link="/api/DeclaredAPI/mockOnce">
            <Method>mockOnce</Method>
          </NavEntry>
          <NavEntry link="/api/DeclaredAPI/unmock">
            <Method>unmock</Method>
          </NavEntry>
          <NavEntry link="/api/DeclaredAPI/ResponseType">
            <Type>ResponseType</Type>
          </NavEntry>
          <NavEntry link="/api/DeclaredAPI/ServerResponseType">
            <Type>ServerResponseType</Type>
          </NavEntry>
          <NavEntry link="/api/DeclaredAPI/BodyType">
            <Type>BodyType</Type>
          </NavEntry>
          <NavEntry link="/api/DeclaredAPI/CallArgsType">
            <Type>CallArgsType</Type>
          </NavEntry>
          <NavEntry link="/api/DeclaredAPI/RequestType">
            <Type>RequestType</Type>
          </NavEntry>
        </Indent>
        <NavEntry link="/api/fetchAdapter">fetchAdapter</NavEntry>
        <NavEntry link="/api/requestPromiseAdapter">requestPromiseAdapter</NavEntry>
      </Indent>
    </Container>
  )
}
