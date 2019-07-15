import React from 'react'
import IndexLayout from '../../layouts'
import Page from '../../components/Page'
import Container from '../../components/Container'
import { Purpose } from '../../components/api-components'
import { ToDo } from '../../components/ToDo'

export default function RequestPromiseAdapter() {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>API Reference</h1>
          <h2>requestPromiseAdapter</h2>
        </Container>
        <Purpose>An adapter that utilizes request-promise to invoke APIs</Purpose>
        <ToDo>
          <p>
            The adapter is not documented, and is not of all that high quality as it is and it makes various non-general assumptions. It
            should serve to give you some ideas on how a proper fetch adapter might be implemented, though.
          </p>
        </ToDo>
      </Page>
    </IndexLayout>
  )
}
