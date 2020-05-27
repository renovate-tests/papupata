import { TypeEditor } from '../TypeEditorContext'
import { NestedLiveEditProvider } from '../../LiveEditContext'
import OptionalWrapper from '../../OptionalWrapper'
import React, { useCallback, useState } from 'react'
import { JSONApiType, ObjectApiType } from 'papudoc/dist/jsonAPI'
import styled from 'styled-components'
import ExpandedEditor from '../ExpandedEditor'

interface Props {
  property: ObjectApiType['properties'][0]
  even: boolean
}

const ComplexEditor = styled.td`
  border-left: 3px solid orange;
`

const ExpandButton = styled.button`
  float: right;
  background: lime;
`
ComplexEditor.defaultProps = { colSpan: 2 }

const Row = styled.tr<{ even: boolean }>`
  background-color: ${({ even }) => (even ? '#EEF' : '#DDF')};
  td {
    padding: 5px 0;
  }
`

const TallEditor = styled.div`
  display: flex;
  align-items: stretch;
`

const Separator = styled.div`
  margin: 0 10px;
  width: 3px;
  background: orange;
`
const EditorBody = styled.div`
  flex-grow: 1;
`

const NameColumn = styled.td`
  width: 200px;
`

export default function ObjectProperty({ property, even }: Props) {
  const [expanded, setExpanded] = useState(false)
  const UnwrappedEditor = <TypeEditor type={property.type} setupDefaultValue={property.required} />
  const toggleExpanded = useCallback(() => setExpanded((x) => !x), [])
  const editor = (
    <NestedLiveEditProvider addToPath={property.name}>
      <OptionalWrapper isRequired={property.required}>{UnwrappedEditor}</OptionalWrapper>
    </NestedLiveEditProvider>
  )
  const CreateEditor = useCallback(() => {
    return <>{editor}</>
  }, [editor])

  if (isSimple(property.type)) {
    return (
      <Row even={even}>
        <NameColumn>{property.name}</NameColumn>
        <td>{editor}</td>
      </Row>
    )
  } else {
    return (
      <>
        <Row even={even}>
          <td>{property.name}</td>
          <td>
            <ExpandButton onClick={toggleExpanded}>{expanded ? '-' : 'v'}</ExpandButton>
          </td>
        </Row>
        <Row even={even}>
          {expanded ? (
            <td colSpan={2}>
              <ExpandedEditor ChildComponent={CreateEditor} />{' '}
            </td>
          ) : (
            <td colSpan={2}>
              <TallEditor>
                <Separator />
                <EditorBody>{editor}</EditorBody>
              </TallEditor>
            </td>
          )}
        </Row>
      </>
    )
  }
}

function isSimple(type: JSONApiType) {
  // 2 keys would be just type and name
  return Object.keys(type).length === 2 || type.type.includes('Literal')
}
