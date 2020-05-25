import styled from 'styled-components'
import React, { useCallback, useEffect } from 'react'
import Loading from '../../components/Loading'
import { useRoute } from 'react-router5'
import { getStore } from '../../utils/store'
import navigate from '../../navigate'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default function WaitForRequest() {
  const route = useRoute()
  const { apiName, requestName } = route.route.params || {}
  const check = useCallback(() => {
    if (getStore().apis?.[apiName]?.pastRequests?.[requestName]?.response?.timestamp) {
      navigate.toPastRequest(apiName, requestName)
    }
  }, [apiName, requestName])

  useEffect(() => {
    const interval: ReturnType<typeof setInterval> = setInterval(check, 200)
    return () => {
      clearInterval(interval)
    }
  })

  useEffect(check, [check])

  return (
    <Container>
      <p>Waiting for the request to complete, one moment please...</p>
      <Loading />
    </Container>
  )
}
