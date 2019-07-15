import React from 'react'
import styled from 'styled-components'
import { Banner } from './Banner'

const Container = styled(Banner)`
  border-color: yellowgreen;
  background-color: #ffffa7;
  outline-color: #ffffa7;
`

export const ToDo: React.FC = ({ children }) => {
  return <Container>{children || 'This section needs more work.'}</Container>
}
