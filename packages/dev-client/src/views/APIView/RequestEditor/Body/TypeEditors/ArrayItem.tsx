import { JSONApiType } from 'papudoc/dist/jsonAPI'
import React, { useCallback, useState } from 'react'
import { isSimple, Row, Separator } from './common'
import { TypeEditor } from '../TypeEditorContext'
import { NestedLiveEditProvider, useBodyLiveEdit } from '../../LiveEditContext'
import produce from 'immer'
import ExpandButton from '../ExpandButton'
import { ExpandWrapper } from '../ExpandedEditor'
import styled from 'styled-components'

interface Props {
  type: JSONApiType
  index: number
}
const TD = styled.td`
  vertical-align: top;
 `


export default function ArrayItem({ index, type }: Props) {
  const { value, setValue } = useBodyLiveEdit<any[]>()
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = useCallback(() => setExpanded((x) => !x), [])

  if (!value) throw new Error('Must have value by now')
  const isLast = value.length === index + 1

  const move = useCallback(
    (indexOffset: number) => {
      const other = value[index - 1 + indexOffset]
      const me = value[index + indexOffset]
      setValue(
        produce(value, (template) => {
          template.splice(index - 1 + indexOffset, 2, me, other)
        })
      )
    },
    [index, setValue, value]
  )

  const moveUp = useCallback(() => move(0), [move])
  const moveDown = useCallback(() => move(1), [move])

  const handleDelete = useCallback(() => {
    setValue(
      produce(value, (template) => {
        template.splice(index, 1)
      })
    )
  }, [index, value, setValue])

  return (
    <Row key={index} even={index % 2 === 0}>
      <TD>{index}</TD>
      <TD>
        <ExpandWrapper expanded={expanded}>
          <NestedLiveEditProvider addToPath={index.toString()}>
            <TypeEditor type={type} setupDefaultValue={true} />
          </NestedLiveEditProvider>
        </ExpandWrapper>
      </TD>
      <TD>
        <button onClick={moveUp} style={{ visibility: index === 0 ? 'hidden' : 'visible' }}>
          ^
        </button>
        <button onClick={moveDown} style={{ visibility: isLast ? 'hidden' : 'visible' }}>
          v
        </button>
        <button onClick={handleDelete}>del</button>
        {!isSimple(type) && <ExpandButton expanded={expanded} onClick={toggleExpanded} />}
      </TD>
    </Row>
  )
}
