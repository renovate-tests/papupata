import React from 'react'
import { Example, Examples, Purpose } from '../../components/api-components'
import Container from '../../components/Container'
import Page from '../../components/Page'
import IndexLayout from '../../layouts'

export default function SkipHandlingRoute() {
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
          <p>Most people will no need this, but there are a few use cases where this functionality can be useful.</p>
          <p>
            If routing needs are such, that there can be false positives for the route implementation, then this value can be used to defer
            the execution to other handlers. A common case would be serving HTML if the client expects it, and only running the API call
            itself for calls that have, say, Accept header requesting JSON.
          </p>
          <p>
            Another case would be when autoImplementAllAPIs is enabled, but you cannot actually implement all the APIs with papupata.
            Perhaps you need a pecualiar combination of middleware that make it more difficult, maybe you even want to defer to another
            papupata router. Or perhaps the route is implemented by a library. In these cases you can implement the route as one that always
            returns skipHandlingRoute to indicate that other code is responsible for it.
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
