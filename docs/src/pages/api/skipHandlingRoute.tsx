import React from 'react'
import IndexLayout from '../../layouts'
import Page from '../../components/Page'
import Container from '../../components/Container'
import { Purpose, Example, Examples } from '../../components/api-components'
import { ToDo } from '../../components/ToDo'

export default function FetchAdapter() {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>API Reference</h1>
          <h2>skipHandlingRoute</h2>
        </Container>
        <Example>{`import {skipHandlingRoute} from 'papupata'`}</Example>
        <Purpose>
          <p>
            A token value a route implementation or papupata middleware can return to have express move on to the other route handlers and
            middleware.
          </p>
        </Purpose>
        <Examples>
          <Example label="Conditional skip">{`
                api.implement(req => {
                    if (req.headers.accept.includes('text/html')) return skipHandlingRoute
                    return processRequest(req)
                })
            `}</Example>
          <Example label="Defer execution to non-papupata implementation">{`
                const api = API.declareGetAPI('/test').response<string>()
                api.implement(() => skipHandlingRoute)
                app.get('/test', (_req, res) => res.send('OK!'))
            `}</Example>
        </Examples>
      </Page>
    </IndexLayout>
  )
}
