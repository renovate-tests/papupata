import { JSONApiType, ObjectApiType } from 'papudoc/dist/jsonAPI'
import { TypeEditor } from '../TypeEditorContext'
import React from 'react'
import styled from 'styled-components'
import OptionalFieldWrapper from '../OptionalFieldWrapper'
import { NestedLiveEditProvider } from '../../LiveEditContext'

interface Props {
  type: ObjectApiType
}

const Table = styled.table`
  border-left: 3px solid purple;
`

const ComplexEditor = styled.td`
  border-left: 3px solid orange;
  padding-left: 10px;
`

ComplexEditor.defaultProps = { colSpan: 2 }

export default function ObjectEditor({ type }: Props) {
  return (
    <Table>
      <tbody>
        {type.properties.map((property) => {
          const UnwrappedEditor = <TypeEditor type={property.type} />
          const NonLiveEditor = property.required ? (
            UnwrappedEditor
          ) : (
            <OptionalFieldWrapper>{UnwrappedEditor}</OptionalFieldWrapper>
          )
          const Editor = <NestedLiveEditProvider addToPath={property.name}>{NonLiveEditor}</NestedLiveEditProvider>
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
        })}
      </tbody>
    </Table>
  )
}

function isSimple(type: JSONApiType) {
  // 2 keys would be just type and name
  return Object.keys(type).length === 2 || type.type.includes('Literal')
}
