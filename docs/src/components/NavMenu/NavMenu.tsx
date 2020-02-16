import React from 'react'
import styled from 'styled-components'
import NavEntry from './NavEntry'
import { NavEntries } from './NavEntries'
import NewNav from './NewNav'

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

const Property = styled.span``

export default function NavMenu() {
  const entries: NavEntries = {
    '/what-is-papupata': 'What is papupata?',
    '/getting-started': 'Getting started',
    '/api-reference': {
      label: 'API Reference',
      children: {
        '/api/APIDeclaration': {
          label: 'class APIDeclaration',
          children: {
            '/api/APIDeclaration/configure': <Method>configure</Method>,
            '/api/APIDeclaration/declareDeleteAPI': <Method>declareDeleteAPI</Method>,
            '/api/APIDeclaration/declareGetAPI': <Method>declareGetAPI</Method>,
            '/api/APIDeclaration/declarePostAPI': <Method>declarePostAPI</Method>,
            '/api/APIDeclaration/declarePatchAPI': <Method>declarePatchAPI</Method>,
            '/api/APIDeclaration/declarePutAPI': <Method>declarePutAPI</Method>,
            '/api/APIDeclaration/unmockAll': <Method>unmockAll</Method>
          }
        },
        '/api/IncompleteAPIDeclaration': {
          label: 'IncompleteAPIDeclaration',
          children: {
            '/api/IncompleteAPIDeclaration/params': <Method>params</Method>,
            '/api/IncompleteAPIDeclaration/query': <Method>query</Method>,
            '/api/IncompleteAPIDeclaration/optionalQuery': <Method>optionalQuery</Method>,
            '/api/IncompleteAPIDeclaration/queryBool': <Method>queryBool</Method>,
            '/api/IncompleteAPIDeclaration/body': <Method>body</Method>,
            '/api/IncompleteAPIDeclaration/response': <Method>response</Method>
          }
        },
        '/api/DeclaredAPI': {
          label: 'DeclaredAPI',
          children: {
            '/api/DeclaredAPI/invoke': <Method>invoke</Method>,
            '/api/DeclaredAPI/getURL': <Method>getURL</Method>,
            '/api/DeclaredAPI/implement': <Method>implement</Method>,
            '/api/DeclaredAPI/implementation': <Property>implementation</Property>,
            '/api/DeclaredAPI/implementationMiddleware': <Property>implementationMiddleware</Property>,
            '/api/DeclaredAPI/implementWithMiddleware': <Method>implementWithMiddleware</Method>,
            '/api/DeclaredAPI/implementWithExpressMiddleware': <Method>implementWithExpressMiddleware</Method>,
            '/api/DeclaredAPI/implementWithPapupataMiddleware': <Method>implementWithPapupataMiddleware</Method>,
            '/api/DeclaredAPI/mock': <Method>mock</Method>,
            '/api/DeclaredAPI/mockOnce': <Method>mockOnce</Method>,
            '/api/DeclaredAPI/unmock': <Method>unmock</Method>,
            '/api/DeclaredAPI/method': <Property>method</Property>,
            '/api/DeclaredAPI/apiDeclaration': <Property>apiDeclaration</Property>,
            '/api/DeclaredAPI/apiUrlParameters': <Property>apiUrlParameters</Property>,
            '/api/DeclaredAPI/ResponseType': <Type>ResponseType</Type>,
            '/api/DeclaredAPI/ServerResponseType': <Type>ServerResponseType</Type>,
            '/api/DeclaredAPI/BodyType': <Type>BodyType</Type>,
            '/api/DeclaredAPI/CallArgsType': <Type>CallArgsType</Type>,
            '/api/DeclaredAPI/RequestType': <Type>RequestType</Type>
          }
        },
        '/api/skipHandlingRoute': 'skipHandlingRoute',
        '/api/handleUndefinedResponsesMiddleware': 'handleUndefinedResponsesMiddleware',
        '/api/requestPromiseAdapter': 'requestPromiseAdapter',
        '/api/fetchAdapter': 'fetchAdapter'
      }
    }
  }
  return (
    <Container>
      <Heading>Table of contents</Heading>
      <NewNav entries={entries} />
    </Container>
  )
}
