import * as React from 'react'

import Page from '../../../components/Page'
import Container from '../../../components/Container'
import IndexLayout from '../../../layouts'
import { FixedFont, GuideContent, Overview } from '../../../components/guides'
import { Example } from '../../../components/api-components'

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>Guide: interacting with express</h1>
        <Overview>
          It is not uncommon to want to integrate papupata into an existing express application, whether it is to use the middleware or just
          using papupata to model the APIs implemented with express.
        </Overview>
        <GuideContent
          content={[
            {
              heading: 'The basics',
              anchor: 'basics',
              content: (
                <>
                  <p>
                    Papupata connects itself straight to the express app, or you can provide it an express router that you can embed
                    anywhere you wish in your express application. The timing of things depends on the configuration setting <FixedFont>autoImplementAllAPIs</FixedFont>:
                    if it is enabled, the APIs are added to the app or router when the configuration happens, if disabled, they are added when they are implemented.
                  </p>
                </>
              )
            }
          ]}
        />
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
