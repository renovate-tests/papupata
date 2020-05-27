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
export const SecondaryActionButton = styled(ActionButton)`
  background: blue;
  &:focus,
  &:hover {
    background: deepskyblue;
  }
`

export const DeleteActionButton = styled(ActionButton)`
  background: darkred;
  &:focus,
  &:hover {
    background: red;
  }
`
