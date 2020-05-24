import styled from 'styled-components'

const FormInput = styled.input`
  min-width: 300px;
  padding: 10px;
`
const Entry = styled.div`
  margin: 30px 0;
`
const FormLabel = styled.div`
  font-size: 0.75em;
  opacity: 0.8;
  margin-bottom: 5px;
`
const Submit = styled.button`
  background: darkblue;
  color: white;
  border: none;
  padding: 15px 30px;
  transition: background-color 200ms linear;
  &:focus,
  &:hover {
    background: blue;
  }
`

export const form = {
  Entry,
  FormInput,
  FormLabel,
  Submit,
}
