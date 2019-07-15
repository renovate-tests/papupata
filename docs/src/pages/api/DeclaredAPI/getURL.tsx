import IndexLayout from '../../../layouts'
import Page from '../../../components/Page'
import Container from '../../../components/Container'
import { Purpose, Usage, Parameter, Parameters, MethodReturnType, Examples, Example, Caveats } from '../../../components/api-components'

export default function GetURL() {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>API Reference</h1>
          <h2>class DeclaredAPI</h2>
          <h3>method getURL</h3>
        </Container>
        <Purpose>Get the URL for the API</Purpose>
        <Usage>
          <p>This function requires base URL to be configured in order to work.</p>

          <p>
            As path parameters are considered to be a part of the URL, their values must be provided to the getAPI call and they are
            injected in to the URL.
          </p>
        </Usage>
        <Parameters>
          <Parameter name="pathParams" dataType="Object">
            Path parameters value for the API
          </Parameter>
        </Parameters>
        <MethodReturnType>string</MethodReturnType>
        <Caveats>Although query parameters are represented in an URL, this function does not handle those.</Caveats>
        <Examples>
          <Example>
            {`
            import { APIDeclaration } from 'papupata'
            const api = new APIDeclaration()
            api.configure({baseURL: 'https://example.com'})
            const myAPI = api.declarePostAPI('/do-stuff/:param')
              .params(['param'] as const)
              .response<string>()

            const URL = myAPI.getURL({param: 'value'})
            // URL is now https://example.com/do-stuff/value
          `}
          </Example>
        </Examples>
      </Page>
    </IndexLayout>
  )
}
