import React from 'react'
import { ucFirst } from '../utils'
import IndexLayout from '../layouts'
import Page from './Page'
import Container from './Container'
import {
  Purpose,
  Usage,
  Parameters,
  MethodReturnType,
  Parameter,
  Examples,
  Example,
  AvailableFrom,
} from './api-components'
import { IncompleteApiDeclarationLink } from './links'

type Props = { method: string, availableFrom?: '1.5.0' }
export default function DeclareAPIPage({ method, availableFrom }: Props) {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>API Reference</h1>
          <h2>class APIDeclaration</h2>
          <h3>method declare{ucFirst(method)}API</h3>
        </Container>
        {availableFrom && <AvailableFrom version={availableFrom}/>}
        <Purpose>Used for declaring an API using the HTTP {method.toUpperCase()} method</Purpose>
        <Usage>APIs can be declared at any time.</Usage>
        <Parameters>
          <Parameter name="path" dataType="string">
            Path to the API under the base URL of the APIDeclaration.
          </Parameter>
          <Parameter name='routeOptions' dataType='varies'>
            Options to the route. Type type is specified by the RouteOptions type parameter of the API declaration.

            They have no inherent meaning in papupata, they are simply stored to be used by the application.
          </Parameter>
        </Parameters>
        <MethodReturnType>
          <IncompleteApiDeclarationLink />
        </MethodReturnType>
        <Examples>
          <Example>
            {`
            import {APIDeclaration} from 'papupata'
            const api = new APIDeclaration()

            const MyAPI = api.declare${ucFirst(method)}API('/api/person')
              .response<string>()
          `}
          </Example>
        </Examples>
      </Page>
    </IndexLayout>
  )
}
