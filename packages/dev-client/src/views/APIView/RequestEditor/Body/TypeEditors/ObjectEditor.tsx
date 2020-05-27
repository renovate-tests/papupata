import { ObjectApiType } from 'papudoc/dist/jsonAPI'
import React from 'react'
import styled from 'styled-components'
import ObjectProperty from './ObjectProperty'
import { Table } from './common'

interface Props {
  type: ObjectApiType
}


export default function ObjectEditor({ type }: Props) {
  return (
    <Table style={{ width: '100%' }}>
      <tbody>
        {type.properties.map((property, i) => (
          <ObjectProperty property={property} key={property.name} even={i % 2 === 0} />
        ))}
      </tbody>
    </Table>
  )
}
