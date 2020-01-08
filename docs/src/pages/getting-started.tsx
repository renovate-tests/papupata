import * as React from 'react'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import { Code } from '../components/Code'
import { ToDo } from '../components/ToDo'

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>Getting Started</h1>
        <h2>Requirements</h2>
        <p>Ensure your codebase meets the following requirements:</p>
        <ul>
          <li>Node 10+ (if using papupata to implement APIs; this requirement can be removed fairly easily if there is demand to do so)</li>
          <li>Typescript 3.4+</li>
          <li>Express (again only if implementing APIs)</li>
        </ul>
        <h2>Installing papupata</h2>
        <Code language="bash">
          {`
              npm i papupata
              npm i -D @types/express
          `}
        </Code>
        <h2>Implementing something simple</h2>
        <p>Setting everything up for doing requests from the browser involves the following steps:</p>
        <ul>
          <li>Declaring the APIs</li>
          <li>Configuring papupata on the server</li>
          <li>Implementing the APIs on the server</li>
          <li>Configuring papupata on the browser</li>
          <li>Making the API calls</li>
        </ul>
        <ToDo>
          Basic instructions are yet to be done. See <a href="https://github.com/BaronaGroup/papupata/tree/master/example">example app</a>{' '}
          and API reference for how all of this can be done.
        </ToDo>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
