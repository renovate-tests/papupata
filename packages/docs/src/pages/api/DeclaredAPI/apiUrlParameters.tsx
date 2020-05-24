import { AvailableFrom, Purpose } from '../../../components/api-components'
import Container from '../../../components/Container'
import { Members, PropertyMember } from '../../../components/members-table'
import Page from '../../../components/Page'
import IndexLayout from '../../../layouts'

export default function ApiUrlParameters() {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>API Reference</h1>
          <h2>class DeclaredAPI</h2>
          <h3>property apiUrlParameters</h3>
        </Container>
        <AvailableFrom version="1.5.0" />
        <Purpose>Exposes the path and query parameters of the api</Purpose>
        <Members context="DeclaredAPI/apiUrlParameters" includeRequiredColumn={true}>
          <PropertyMember dataType={'string[]'} name="params" required="false">
            Path parameters of the API
          </PropertyMember>
          <PropertyMember dataType={'string[]'} name="query" required="false">
            Regular query parameters of the API
          </PropertyMember>
          <PropertyMember dataType={'string[]'} name="optionalQuery" required="false">
            Optional query parameters of the API
          </PropertyMember>
          <PropertyMember dataType={'string[]'} name="boolQuery" required="false">
            Boolean query parameters of the API
          </PropertyMember>
        </Members>
      </Page>
    </IndexLayout>
  )
}
