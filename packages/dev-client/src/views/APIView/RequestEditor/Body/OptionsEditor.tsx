import React, { ReactNode, useCallback, useState } from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode
}

const Container = styled.div`
  position: relative;
`
const Panel = styled.div`
  background: white;
  padding: 7px;
  font-size: 0.75em;
  box-shadow: 2px 2px 4px;
  position: absolute;
  right: 0;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  > *:hover {
    background: #EEF;
  }
`

export default function OptionsEditor({ children }: Props) {
  const [toggled, setToggled] = useState(false)

  const toggle = useCallback(() => setToggled((x) => !x), [])

  return (
    <Container>
      <button onClick={toggle}>{toggled ? '-' : 'v'}</button>
      {toggled && <Panel>{children}</Panel>}
    </Container>
  )
}
