import { ReactNode, useMemo, useCallback } from 'react'
import { API } from '../../../typedAPI'
import React from 'react'
import { useLiveEdit } from './LiveEditContext'
import styled, { css } from 'styled-components'

interface Props {
  field: API['query'][0]
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

export default function OptionalWrapper({ children, field }: Props) {
  const cp = useMemo(() => ['request', 'pq', field.name], [field.name])
  const liveEdit = useLiveEdit(cp)

  const unset = useCallback(() => {
    liveEdit.setValue(undefined)
  }, [liveEdit])

  if (!field.optional) {
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
