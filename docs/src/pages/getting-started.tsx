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
          <li>Typescript 5.4+</li>
        </ul>
        <h2>Installing papupata</h2>
        <Code language="bash">npm i papupata</Code>
        <ToDo>Basic instructions are yet to be done.</ToDo>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
