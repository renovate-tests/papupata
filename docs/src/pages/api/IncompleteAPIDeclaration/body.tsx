import IndexLayout from '../../../layouts'
import Page from '../../../components/Page'
import Container from '../../../components/Container'
import { Purpose, Usage, Parameter, Parameters, MethodReturnType, Examples, Example, Caveats } from '../../../components/api-components'
import { IncompleteApiDeclarationLink } from '../../../components/links'

export default function Body() {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>API Reference</h1>
          <h2>class IncompleteAPIDeclaration</h2>
          <h3>method body</h3>
        </Container>
        <Purpose>Declares body type for an API.</Purpose>
        <Usage>
          <p>Path params and query parameters must be defined before query.</p>
        </Usage>
        <Parameters>
          <Parameter name="<BodyType>" dataType="Interface">
            The body type is declared as a type parameter.
          </Parameter>
        </Parameters>
        <MethodReturnType>
          <IncompleteApiDeclarationLink />
        </MethodReturnType>
        <Caveats>
          <ul>
            <li>At this time the body, if used, must always be an object. This will be changed eventually.</li>
            <li>There is no validation for the shape of the body on the server</li>
            <li>This option is presented for methods without body, even if it is does nothing useful in those cases.</li>
          </ul>
        </Caveats>
        <Examples>
          <Example label="Declaration">
            {`
            import { APIDeclaration } from 'papupata'
            const api = new APIDeclaration()
            const myAPI = api.declarePostAPI('/do-stuff')
              .body<{value: number}>()
              .response<string>()
          `}
          </Example>
          <Example label="Usage in invocation">
            {`
            await myAPI({value: 123})
          `}
          </Example>
          <Example label="Usage in implementation">
            {`
            myAPI.implement(req => {
              const {value} = req.body
              return value.toString() // 123 in the example
            })            
          `}
          </Example>
        </Examples>
      </Page>
    </IndexLayout>
  )
}
