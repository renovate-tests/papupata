import IndexLayout from '../../../layouts'
import Page from '../../../components/Page'
import Container from '../../../components/Container'
import { Purpose, Examples, Example } from '../../../components/api-components'

export default function ApiDeclaration() {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>API Reference</h1>
          <h2>class DeclaredAPI</h2>
          <h3>property apiDeclaration</h3>
        </Container>
        <Purpose>
          <p>The API declaration on which the api was declared.</p>
          <p>
            Typed as "any" in typescript because of circular declarations making it difficult if not impossible to expose the type properly.
          </p>
        </Purpose>
      </Page>
    </IndexLayout>
  )
}
