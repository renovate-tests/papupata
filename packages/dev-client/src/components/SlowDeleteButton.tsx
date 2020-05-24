import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const delay = 500

interface Props {
  onClick(): void
}

const Button = styled.button`
  position: relative;
`

const Bar = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  background: red;

  &.held {
    transition: width ${delay}ms linear;
    width: 100%;
  }
`
const Text = styled.span`
  transition: opacity 150ms linear;
`

export default function SlowDeleteButton({ onClick }: Props) {
  const [held, setHeld] = useState(false)
  useEffect(() => {
    if (!held) return
    let timer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      timer = null
      onClick()
    }, delay)
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [held])

  return (
    <Button onMouseDown={() => setHeld(true)} onMouseUp={() => setHeld(false)}>
      <Bar className={held ? 'held' : ''} />
      <Text style={{ opacity: held ? 0 : 1 }}>X</Text>
    </Button>
  )
}
