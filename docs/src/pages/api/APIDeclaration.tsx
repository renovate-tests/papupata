import React from 'react'
import IndexLayout from '../../layouts'
import Page from '../../components/Page'
import Container from '../../components/Container'
import { Link } from 'gatsby'
import { Purpose, Usage } from '../../components/api-components'
import { MethodMember, Members } from '../../components/members-table'
import { IncompleteApiDeclarationLink } from '../../components/links'
import { ucFirst } from '../../utils'

const DeclareAPI: React.FC<{ method: string }> = ({ method }) => (
  <MethodMember name={`declare${ucFirst(method)}API`} dataType={<IncompleteApiDeclarationLink />}>
    Declares an API using the {method.toUpperCase()} HTTP method.
  </MethodMember>
)

export default function APIDeclaration() {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>API Reference</h1>
          <h2>class APIDeclaration</h2>
        </Container>
        <Purpose>Used for declaring, implementing and callind APIs</Purpose>
        <Usage>
          <p>
            Once created, APIs can be declared using most of the methods. Before implemting or calling the APIs the object must be
            configured using its <Link to="/api/APIDeclaration/configure">configure method.</Link>
          </p>
          <p>
            APIDeclaration has an expicit type parameter, which can be used to override the type of the request used in the API
            implementations. It defaults to express request.
          </p>
        </Usage>
        <Members context="APIDeclaration">
          <MethodMember name="configure" dataType="void">
            Configures papupata to allow implementing and/or calling the declared APIs.
          </MethodMember>
          <DeclareAPI method="delete" />
          <DeclareAPI method="get" />
          <DeclareAPI method="post" />
          <DeclareAPI method="put" />
        </Members>
      </Page>
    </IndexLayout>
  )
}
