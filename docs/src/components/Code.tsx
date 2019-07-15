import React from 'react'
import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'

// @ts-ignore
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Container = styled.div``

export const Code: React.FC<{ language: string }> = ({ language, children }) => {
  return (
    <Container>
      <SyntaxHighlighter language={language} style={docco}>
        {children}
      </SyntaxHighlighter>
    </Container>
  )
}
