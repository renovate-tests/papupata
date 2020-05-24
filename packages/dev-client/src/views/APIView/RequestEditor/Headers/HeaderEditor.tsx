import { SectionHeader, Section } from '../common'
import React, { useCallback } from 'react'
import { useLiveEdit } from '../LiveEditContext'
import AuthHeader from './AuthHeaders'
import SuggestedHeaders from './SuggestedHeaders'
import SingleHeaderEditor from './SingleHeaderEditor'
import produce from 'immer'

import { v4 as uuid } from 'uuid'

export interface StoredHeader {
  name: string
  value: string
  internalId: string
}

export default function HeaderEditor() {
  const headerEdit = useLiveEdit<StoredHeader[]>(['request', 'headers'])
  const headers = headerEdit.value || []
  const nonEmptyHeaders = headers.filter((h) => h.name !== '' || h.value !== '')
  const possiblyEmptyHeader = headers[headers.length - 1]
  const emptyHeader =
    possiblyEmptyHeader && possiblyEmptyHeader.name === '' && possiblyEmptyHeader.value === '' && possiblyEmptyHeader
  const headersIncludingBlank = [
    ...nonEmptyHeaders,
    ...(!nonEmptyHeaders.length || nonEmptyHeaders[nonEmptyHeaders.length - 1].name !== ''
      ? [emptyHeader || { name: '', value: '', internalId: uuid() }]
      : []),
  ]
  const updateHeader = useCallback(
    (index: number, name: string, value: string) => {
      const newValue = produce(headersIncludingBlank, (template) => {
        template[index] = { name, value, internalId: template[index].internalId }
      })
      headerEdit.setValue(newValue)
    },
    [headersIncludingBlank, headerEdit]
  )

  const handleAddHeader = useCallback(
    (name: string, value: string) => {
      headerEdit.setValue([...headersIncludingBlank, { name, value, internalId: uuid() }])
    },
    [headersIncludingBlank, headerEdit]
  )

  const handleReplaceHeader = useCallback(
    (name: string, value: string) => {
      headerEdit.setValue(
        produce(headersIncludingBlank, (template) => {
          template.find((h) => h.name === name)!.value = value
        })
      )
    },
    [headersIncludingBlank, headerEdit]
  )

  const removeHeader = useCallback(
    (index: number) => {
      headerEdit.setValue(
        produce(headersIncludingBlank, (template) => {
          template.splice(index, 1)
        })
      )
    },
    [headersIncludingBlank, headerEdit]
  )

  return (
    <Section>
      <SectionHeader>Headers</SectionHeader>
      <AuthHeader />
      {headersIncludingBlank.map((header, i) => (
        <SingleHeaderEditor
          key={header.internalId}
          header={header}
          index={i}
          onUpdateHeader={updateHeader}
          onRemoveHeader={i === headersIncludingBlank.length - 1 ? undefined : removeHeader}
        />
      ))}
      <SuggestedHeaders existing={headers} onAddHeader={handleAddHeader} onReplaceHeader={handleReplaceHeader} />
    </Section>
  )
}
