import IndexLayout from '../../../layouts'
import Page from '../../../components/Page'
import Container from '../../../components/Container'
import { Purpose, Usage, Parameter, Parameters, MethodReturnType, Examples, Example, Caveats } from '../../../components/api-components'
import { IncompleteApiDeclarationLink } from '../../../components/links'

export default function Query() {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>API Reference</h1>
          <h2>class IncompleteAPIDeclaration</h2>
          <h3>method query</h3>
        </Container>
        <Purpose>Declares required string query parameters for an API</Purpose>
        <Usage>
          <p>Only path params may be defined before query.</p>
        </Usage>
        <Parameters>
          <Parameter name="queryParams" dataType="Const string array">
            <p>Names of the query parameters. See the example below for the recommended way to set up the const string array.</p>
            <p>
              At typescript level a regular string array is not treated as an error at declaration time, but using is NOT correct.
              Unfortunately we have not come up with a way to prevent this kind of usage.
            </p>
          </Parameter>
        </Parameters>
        <MethodReturnType>
          <IncompleteApiDeclarationLink />
        </MethodReturnType>
        <Caveats>
          <ul>
            <li>
              At this time there server side implementation allows undefined values to go through when the API is invoked using means other
              than papupata.
            </li>
          </ul>
        </Caveats>
        <Examples>
          <Example label="Declaration">
            {`
            import { APIDeclaration } from 'papupata'
            const api = new APIDeclaration()
            const myAPI = api.declarePostAPI('/do-stuff')
              .query(['query1', 'query2'] as const)
              .response<string>()
          `}
          </Example>
          <Example label="Usage in invocation">
            {`
            await myAPI({query1: 'abc', query2: 'def'})
            // Invokes URL /do-stuff?query1=abd&query2=def
          `}
          </Example>
          <Example label="Usage in implementation">
            {`
            myAPI.implement(req => {
              const {query1, query2} = req.query
              return query1 + query2 // would return abcdef in the example
            })            
          `}
          </Example>
        </Examples>
      </Page>
    </IndexLayout>
  )
}
