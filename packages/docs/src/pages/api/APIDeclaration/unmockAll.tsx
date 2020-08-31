import IndexLayout from '../../../layouts'
import Page from '../../../components/Page'
import Container from '../../../components/Container'
import { Purpose, Usage, Parameters, MethodReturnType, Examples, Example, AvailableFrom } from '../../../components/api-components'
import { Link } from 'gatsby'
import * as React from 'react'

export default function Mock() {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>API Reference</h1>
          <h2>class APIDeclaration</h2>
          <h3>method unmockAll</h3>
        </Container>
        <Purpose>Undoes API mocking</Purpose>
        <AvailableFrom version={'1.1.0'} />
        <Usage>
          <p>
            This function undoes the mocking done by the <Link to="/api/DeclaredAPI/mock">mock</Link> and{' '}
            <Link to="/api/DeclaredAPI/mockOnce">mockOnce</Link> methods for any of the APIs in the declaration.
          </p>
        </Usage>
        <Parameters />
        <MethodReturnType>nothing</MethodReturnType>
        <Examples>
          <Example>
            {`
            import { APIDeclaration } from 'papupata'
            const api = new APIDeclaration()
            const myAPI = api.declarePostAPI('/do-stuff/:param')
              .response<string>()

            myAPI.mock('test')
            
            api.unmockAll()
          `}
          </Example>
        </Examples>
      </Page>
    </IndexLayout>
  )
}
