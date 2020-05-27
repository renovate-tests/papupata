import styled from 'styled-components'
import { JSONApiType } from 'papudoc/dist/jsonAPI'

export const Table = styled.table``

export const Row = styled.tr<{ even: boolean }>`
  background-color: ${({ even }) => (even ? '#EEF' : '#DDF')};
  td {
    padding: 5px 0;
  }
`
export function isSimple(type: JSONApiType) {
  // 2 keys would be just type and name
  return Object.keys(type).length === 2 || type.type.includes('Literal')
}

export const Separator = styled.div`
  margin: 0 10px;
  width: 3px;
  background: orange;
`