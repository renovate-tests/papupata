import { Section, SectionHeader } from '../common'
import React from 'react'
import { useAPI } from '../../useAPI'
import { typePathContext } from './TypePathContext'
import TypeEditorProvider from './TypeEditorProvider'
import { TypeEditor } from './TypeEditorContext'
import Loading from '../../../../components/Loading'

export interface StoredHeader {
  name: string
  value: string
  internalId: string
}

export default function BodyEditor() {
  const api = useAPI()
  if (!api) return <Loading />
  return (
    <Section style={{ position: 'relative' }}>
      <SectionHeader>Body</SectionHeader>
      {api.body ? (
        <typePathContext.Provider value={[]}>
          <TypeEditorProvider>
            <TypeEditor type={api.body} setupDefaultValue={true} />
          </TypeEditorProvider>
        </typePathContext.Provider>
      ) : (
        <p>This API has no body.</p>
      )}
    </Section>
  )
}
