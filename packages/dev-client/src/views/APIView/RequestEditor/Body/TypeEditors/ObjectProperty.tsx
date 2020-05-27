import { TypeEditor } from '../TypeEditorContext'
import { NestedLiveEditProvider } from '../../LiveEditContext'
import OptionalWrapper from '../../OptionalWrapper'
import React, { useCallback, useState } from 'react'
import { JSONApiType, ObjectApiType } from 'papudoc/dist/jsonAPI'
import styled from 'styled-components'
import ExpandedEditor from '../ExpandedEditor'

interface Props {
  property: ObjectApiType['properties'][0]
}

const ComplexEditor = styled.td`
  border-left: 3px solid orange;
  padding-left: 10px;
`

const ExpandButton = styled.button`
  float: right;
  background: lime;
`
ComplexEditor.defaultProps = { colSpan: 2 }

export default function ObjectProperty({ property }: Props) {
  const [expanded, setExpanded] = useState(false)
  const UnwrappedEditor = <TypeEditor type={property.type} />
  const toggleExpanded = useCallback(() => setExpanded((x) => !x), [])
  const Editor = (
    <NestedLiveEditProvider addToPath={property.name}>
      <OptionalWrapper isRequired={property.required} liveEditPath={[]}>
        {UnwrappedEditor}
      </OptionalWrapper>
    </NestedLiveEditProvider>
  )
  const CreateEditor = useCallback(() => {
    return <>{Editor}</>
  }, [Editor])

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
          <td>
            <ExpandButton onClick={toggleExpanded}>{expanded ? '-' : 'v'}</ExpandButton>
          </td>
        </tr>
        <tr>
          {expanded ? (
            <td colSpan={2}>
              <ExpandedEditor ChildComponent={CreateEditor} />{' '}
            </td>
          ) : (
            <ComplexEditor>{Editor}</ComplexEditor>
          )}
        </tr>
      </>
    )
  }
}

function isSimple(type: JSONApiType) {
  // 2 keys would be just type and name
  return Object.keys(type).length === 2 || type.type.includes('Literal')
}
