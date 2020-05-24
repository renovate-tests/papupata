import React, { useMemo } from 'react'
import { StoredHeader } from './HeaderEditor'
import { useConfig } from '../../../../config'
import styled from 'styled-components'

interface Props {
  existing: StoredHeader[]
  onAddHeader(name: string, value: string): void
  onReplaceHeader(name: string, value: string): void
}

const Heading = styled.span`
  color: darkgreen;
`

const Row = styled.div`
  display: flex;
`

const RowContent = styled.div`
  flex-grow: 1;
  font-size: 0.7em;
`

export default function SuggestedHeaders({ existing, onAddHeader, onReplaceHeader }: Props) {
  const config = useConfig()
  const suggestions = useMemo(
    () =>
      (config.suggestedHeaders || []).filter((h) => !existing.some((ex) => ex.name === h.name && ex.value === h.value)),
    [config, existing]
  )

  if (!suggestions.length) return null
  return (
    <div>
      {suggestions.map((suggestion) => {
        const suggestReplace = existing.some((h) => h.name === suggestion.name)
        return (
          <Row key={suggestion.name}>
            <RowContent>
              <Heading>Suggested:</Heading> {suggestion.name}: {suggestion.value}
            </RowContent>
            {suggestReplace && <button onClick={() => onReplaceHeader(suggestion.name, suggestion.value)}>Set</button>}
            <button onClick={() => onAddHeader(suggestion.name, suggestion.value)}>Add</button>
          </Row>
        )
      })}
    </div>
  )
}
