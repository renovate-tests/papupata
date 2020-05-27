import React, { createRef, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
  ChildComponent: React.FC<{}>
}

const Wrapper = styled.div`
  border: 2px solid black;
  padding: 5px;
  background: white;
`

const Locator = styled.div`
  position: absolute;
  left: 0;
  width: 1px;
  height: 1px;
  visibility: hidden;
  pointer-events: none;
`

export default function ExpandedEditor({ ChildComponent }: Props) {
  const wrapperRef = createRef<HTMLDivElement>()
  const locatorRef = createRef<HTMLDivElement>()

  const [offset, setOffset] = useState(0)

  useLayoutEffect(() => {
    if (locatorRef.current && wrapperRef.current) {
      let a = locatorRef.current.getBoundingClientRect().left
      let b = wrapperRef.current.getBoundingClientRect().left
      const newOffset = offset + a - b
      console.log(a, b, newOffset)
      if (a !== b) setOffset(newOffset)
    }
  }, [wrapperRef, locatorRef, offset])

  console.log('off', offset)
  return (
    <>
      <Locator ref={locatorRef} />
      <Wrapper ref={wrapperRef} style={{ marginLeft: offset }}>
        <ChildComponent />
      </Wrapper>
    </>
  )
}
