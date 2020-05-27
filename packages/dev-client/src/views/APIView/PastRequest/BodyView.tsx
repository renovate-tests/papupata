import React, { ReactNode, useCallback, useState } from 'react'
import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import beautifyHTML from '../../../utils/beautifyHTML'

const Unspecified = styled.div`
  font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  color: yellowgreen;
  white-space: pre;
  border: 1px solid black;
  padding: 8px;
  font-size: 0.8em;
  background: #eee;
`

const Raw = Unspecified

interface Props {
  children: string
  heading: ReactNode
}


export default function BodyView({ children, heading }: Props) {
  const [raw, setRaw] = useState(false)
  let rendered = { raw: true, elem: <Raw>{children}</Raw> }
  if (!raw) {
    try {
      rendered = renderBody(children)
    } catch (err) {
      // ignore
    }
  }
  const toggleRaw = useCallback(() => setRaw((x) => !x), [])
  return (
    <div>
      <h4>{heading}</h4>
      {!rendered?.raw || raw ? (
        <div>
          <label>
            <input type={'checkbox'} checked={raw} onChange={toggleRaw} /> Raw output
          </label>
        </div>
      ) : null}
      {raw ? <Raw>{children}</Raw> : rendered?.elem}
    </div>
  )
}

function renderBody(body: string) {
  if (body.startsWith('<')) {
    return {
      raw: false,
      elem: (
        <SyntaxHighlighter language="html" style={docco} customStyle={{whiteSpace:'pre-wrap'}}>
          {beautifyHTML(body)}
        </SyntaxHighlighter>
      ),
    }
  } else if (body.startsWith('{') || body.startsWith('[')) {
    return {
      raw: false,
      elem: (
        <SyntaxHighlighter language="json" style={docco} customStyle={{whiteSpace:'pre-wrap'}}>
          {JSON.stringify(JSON.parse(body), null, 2)}
        </SyntaxHighlighter>
      ),
    }
  }
  return { raw: true, elem: <Unspecified>{body}</Unspecified> }
}
