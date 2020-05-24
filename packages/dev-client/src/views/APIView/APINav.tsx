import React, { useContext } from 'react'
import styled from 'styled-components'
import { apiContext } from '../../apiContext'
import { APISet } from '../../typedAPI'
import NavAPI from './NavAPI'

export default function APINav() {
  const apis = useContext(apiContext)
  return <APINavLevel apis={apis} prefix={[]} />
}

interface Props {
  apis: APISet
  prefix: string[]
}

const Indent = styled.div`
  margin-left: 15px;
  margin-bottom: 10px;
`

export function APINavLevel({ apis, prefix }: Props) {
  const handled = new Set<string>()
  return (
    <>
      {apis.map((api) => {
        const splitPrefix = api.name.split('.').slice(0, -1)

        if (prefix.join('.') === splitPrefix.join('.')) {
          return <NavAPI key={api.name} api={api} />
        }
        if (prefix.every((p, i) => splitPrefix[i] === p)) {
          // Common prefix
          const innerPrefix = splitPrefix.slice(0, prefix.length + 1)
          if (handled.has(innerPrefix.join('.'))) return null
          handled.add(innerPrefix.join('.'))
          return (
            <React.Fragment key={innerPrefix.join('.')}>
              <div>{innerPrefix[innerPrefix.length - 1]}</div>
              <Indent>
                <APINavLevel apis={apis} prefix={innerPrefix} />
              </Indent>
            </React.Fragment>
          )
        }
        return null
      })}
    </>
  )
}
