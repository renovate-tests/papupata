import { TypeEditor } from '../TypeEditorContext'
import { NestedLiveEditProvider } from '../../LiveEditContext'
import OptionalWrapper from '../../OptionalWrapper'
import React from 'react'
import { JSONApiType, ObjectApiType } from 'papudoc/dist/jsonAPI'
import styled from 'styled-components'

interface Props {
  property: ObjectApiType['properties'][0]
}

const ComplexEditor = styled.td`
  border-left: 3px solid orange;
  padding-left: 10px;
`
ComplexEditor.defaultProps = { colSpan: 2 }

export default function ObjectProperty({ property }: Props) {
  const UnwrappedEditor = <TypeEditor type={property.type} />
  const Editor = (
    <NestedLiveEditProvider addToPath={property.name}>
      <OptionalWrapper isRequired={property.required} liveEditPath={[]}>
        {UnwrappedEditor}
      </OptionalWrapper>
    </NestedLiveEditProvider>
  )
  if (isSimple(property.type)) {
    return (
      <tr>
        <td>{property.name}</td>
        <td>{Editor}</td>
      </tr>
    )
  } else {
    return (
      <>
        <tr>
          <td>{property.name}</td>
        </tr>
        <tr>
          <ComplexEditor>{Editor}</ComplexEditor>
        </tr>
      </>
    )
  }
}

function isSimple(type: JSONApiType) {
  // 2 keys would be just type and name
  return Object.keys(type).length === 2 || type.type.includes('Literal')
}
