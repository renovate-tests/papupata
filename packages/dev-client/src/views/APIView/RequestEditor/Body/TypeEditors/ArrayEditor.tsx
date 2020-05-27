import { useBodyLiveEdit } from '../../LiveEditContext'
import React, { useCallback } from 'react'
import { ArrayApiType } from 'papudoc/dist/jsonAPI'
import ArrayItem from './ArrayItem'
import { Row, Separator, Table } from './common'
import styled from 'styled-components'

interface Props {
  type: ArrayApiType
}

const ItemContainer = styled.div`
  display: flex;
  > :nth-child(2) {
    flex-grow: 1;
  }
`

export default function ArrayEditor({ type }: Props) {
  const liveEdit = useBodyLiveEdit<any[]>()

  const effectiveValue = Array.isArray(liveEdit.value) ? liveEdit.value : []

  const addItem = useCallback(() => liveEdit.setValue([...effectiveValue, undefined]), [liveEdit, effectiveValue])
  return (
    <div>
      <div>
        Array of {effectiveValue.length} value{effectiveValue.length === 1 ? '' : 's'}
      </div>
      <ItemContainer>
        <Separator />
        <div>
          <Table style={{ width: '100%' }}>
            <tbody>
              {effectiveValue.map((_value, index) => (
                <ArrayItem index={index} type={type.itemType} key={index} />
              ))}
            </tbody>
          </Table>
          <button onClick={addItem}>Add new item</button>
        </div>
      </ItemContainer>
    </div>
  )
}
