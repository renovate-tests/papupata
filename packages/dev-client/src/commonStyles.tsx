import styled from 'styled-components'

export const PageHeader = styled.h1``

export const ActionButton = styled.button`
  background: darkgreen;
  color: white;
  border: none;
  padding: 15px 30px;
  transition: background-color 200ms linear;
  &:focus,
  &:hover {
    background: green;
  }
`
