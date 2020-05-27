import { ObjectApiType } from 'papudoc/dist/jsonAPI'
import React from 'react'
import styled from 'styled-components'
import ObjectProperty from './ObjectProperty'

interface Props {
  type: ObjectApiType
}

const Table = styled.table`
  border-left: 3px solid purple;
`

export default function ObjectEditor({ type }: Props) {
  return (
    <Table style={{ width: '100%' }}>
      <tbody>
        {type.properties.map((property) => (
          <ObjectProperty property={property} key={property.name} />
        ))}
      </tbody>
    </Table>
  )
}
