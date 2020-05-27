import styled from 'styled-components'
import React from 'react'

export const Button = styled.button`
  float: right;
  background: lime;
`

interface Props {
  expanded: boolean
  onClick: () => void
}

export default function ExpandButton({ expanded, onClick }: Props) {
  return <Button onClick={onClick}>{expanded ? '-' : '<'}</Button>
}
