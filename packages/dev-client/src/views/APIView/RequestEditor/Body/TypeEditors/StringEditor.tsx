import { useBodyLiveEdit } from '../../LiveEditContext'
import React, { useCallback } from 'react'
import { useTypeEditOptions } from '../TypePathContext'
import styled from 'styled-components'
import OptionsEditor from '../OptionsEditor'

interface Options {
  multiLine?: boolean
}

const Container = styled.div`
  display: flex;
`
const BigCol = styled.div`
  flex-grow: 1;
  > * {
    width: 100%;
  }
`

const Textarea = styled.textarea`height: 150px;`

export default function StringEditor() {
  const liveEdit = useBodyLiveEdit()
  const optionsEdit = useTypeEditOptions<Options>({})

  console.log(optionsEdit.value)

  const effectiveValue = typeof liveEdit.value !== 'string' ? '' : liveEdit.value || ''

  const updateValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => liveEdit.setValue(e.target.value),
    [liveEdit]
  )
  const toggleMultiline = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      optionsEdit.setValue({ ...optionsEdit.value, multiLine: e.target.checked }),
    [optionsEdit]
  )
  return (
    <Container>
      <BigCol>
        {optionsEdit.value.multiLine ? (
          <Textarea value={effectiveValue} onChange={updateValue} />
        ) : (
          <input value={effectiveValue || ''} onChange={updateValue} />
        )}
      </BigCol>
      <OptionsEditor>
        <label>
          <input checked={!!optionsEdit.value.multiLine} type={'checkbox'} onChange={toggleMultiline} /> multiline
        </label>
      </OptionsEditor>
    </Container>
  )
}
