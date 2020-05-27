import { TypeEditor } from '../TypeEditorContext'
import { NestedLiveEditProvider } from '../../LiveEditContext'
import OptionalWrapper from '../../OptionalWrapper'
import React, { useCallback, useState } from 'react'
import { JSONApiType, ObjectApiType } from 'papudoc/dist/jsonAPI'
import styled from 'styled-components'
import ExpandedEditor from '../ExpandedEditor'
import { isSimple, Row, Separator } from './common'
import ExpandButton from '../ExpandButton'

interface Props {
  property: ObjectApiType['properties'][0]
  even: boolean
}

const TallEditor = styled.div`
  display: flex;
  align-items: stretch;
`

const EditorBody = styled.div`
  flex-grow: 1;
`

const NameColumn = styled.td`
  width: 200px;
`

export default function ObjectProperty({ property, even }: Props) {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = useCallback(() => setExpanded((x) => !x), [])
  const UnwrappedEditor = <TypeEditor type={property.type} setupDefaultValue={property.required} />
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
            <ExpandButton onClick={toggleExpanded} expanded={expanded} />
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
