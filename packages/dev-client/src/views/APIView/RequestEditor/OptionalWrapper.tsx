import React, { ReactNode, useCallback } from 'react'
import { useBodyLiveEdit, useGenericLiveEdit } from './LiveEditContext'
import styled, { css } from 'styled-components'

interface Props {
  isRequired: boolean
  liveEditPath?: string[]
  children: ReactNode
}

const Cols = styled.div`
  display: flex;
`

const InputContainer = styled.div<{ active: boolean }>`
  ${({ active }) =>
    active
      ? css``
      : css`
          opacity: 0.25;
        `}
`

const NoValueLabel = styled.div`
  background: darkred;
  border-radius: 30px;
  color: white;
  font-size: 0.7em;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-right: 20px;
`

export default function OptionalWrapper({ children, isRequired, liveEditPath }: Props) {
  const gle = useGenericLiveEdit(liveEditPath)
  const ble = useBodyLiveEdit()
  const liveEdit = liveEditPath ? gle : ble

  const unset = useCallback(() => {
    liveEdit.setValue(undefined)
  }, [liveEdit])

  if (isRequired) {
    return <div>{children}</div>
  } else {
    const active = liveEdit.value !== undefined
    return (
      <Cols>
        {active ? (
          <button onClick={unset}>x</button>
        ) : (
          <NoValueLabel>
            <span>No value</span>
          </NoValueLabel>
        )}
        <InputContainer active={active}>{children}</InputContainer>
      </Cols>
    )
  }
}
