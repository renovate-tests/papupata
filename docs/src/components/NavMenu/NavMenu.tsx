import React from 'react'
import styled from 'styled-components'
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

const Method: React.FC = ({ children }) => {
  return <span>{children}()</span>
}

const Type = styled.span`
  font-style: italic;
`

const WIP = styled.span`
  color: red;
  font-weight: lighter;
`

const Property = styled.span``

export const guides: NavEntries = {
  '/guides/declaring': {
    label: 'Declaring APIs',
    description:
      'This guide will help you declare APIs whether to model the APIs your application is going to implement them, call them or both.'
  },
  '/guides/metadata': {
    label: <WIP>Accessing metadata</WIP>,
    description: 'This guide will help you access metadata from any declared APIs.'
  },
  '/guides/sharing': {
    label: <WIP>Sharing APIs declarations</WIP>,
    description: 'This guide will help you share your API declarations.'
  },
  '<client>': {
    label: 'Clients',
    children: {
      '/guides/client/setup': {
        label: 'Setting up papupata',
        description: 'This guide will go through all the basic configuration needed to call APIs declared with papupata.'
      },
      '/guides/client/calling': {
        label: 'Calling APIs',
        description: 'This guide will go through the specifics of how to call APIs using papupata'
      },
      '/guides/client/customRequestAdapters': {
        label: <WIP>Custom request adapters</WIP>,
        description:
          'This guide gives you an undestanding of how to change the way papupata does its requests, for example by adding authentication headers.'
      },
      '/guides/client/testing': {
        label: 'Testing',
        description: 'This guide will help you with testing client code that calls APIs using papupata'
      }
    }
  },
  '<server>': {
    label: 'Servers',
    children: {
      '/guides/server/setup': {
        label: 'Setting up papupata',
        description: 'This guide will go through all the basic configuration needed to start implementing APIs with papupata.'
      },
      '/guides/server/implementing': {
        label: <WIP>Implementing APIs</WIP>,
        description: 'This guide will go trough all the specifics of actually implementing APIs.'
      },
      '/guides/server/interactingWithExpress': {
        label: <WIP>Interacting with express</WIP>,
        description:
          'This guide will help you with incorporating papupata with an existing express application, using the existing middleware and implementations.'
      },
      '/guides/server/middleware': {
        label: <WIP>Middleware</WIP>,
        description:
          'Middleware can be used to change the behaviour of APIs. This guide covers how to use and implement middeware in papupata.'
      },
      '/guides/server/testing': {
        label: <WIP>Testing</WIP>,
        description: 'This guide will help you with testing server code that implements APIs with papupata.'
      }
    }
  }
}

export default function NavMenu() {
  const entries: NavEntries = {
    '/what-is-papupata': 'What is papupata?',
    '/getting-started': 'Getting started',
    '/guides': {
      label: 'Guides',
      children: guides
    },
    '/concepts': {
      label: <WIP>Concepts</WIP>,
      children: {
        '/concepts/APIDeclaration': <WIP>API Declaration</WIP>,
        '/concepts/API': <WIP>API</WIP>,
        '/concepts/Route': <WIP>Route</WIP>,
        '/concepts/Middleware': <WIP>Middleware</WIP>,
        '/concepts/Mocks': <WIP>Mocks</WIP>,
        '/concepts/RequestAdapter': <WIP>Request adapter</WIP>
      }
    },
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
