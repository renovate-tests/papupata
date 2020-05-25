import { useRoute } from 'react-router5'
import React, { useMemo } from 'react'
import { getStore } from '../../../utils/store'
import ResponseBody from './ResponseBody'
import ResponseHeaders from './ResponseHeaders'

export default function ViewPastRequest() {
  const { apiName, requestName } = useRoute().route?.params || {}
  const req = useMemo(() => {
    return getStore().apis?.[apiName]?.pastRequests?.[requestName]
  }, [apiName, requestName])

  if (!req) return null
  const response = req.response
  if (!response) return null
  return (
    <div>
      <div>Timestamp: {new Date(response.timestamp).toISOString()}</div>
      <div>Status: {response.status}</div>
      {response.error && <div>Error: {response.error}</div>}
      <ResponseBody>{response.data}</ResponseBody>
      {response.headers && <ResponseHeaders headers={response.headers} />}
    </div>
  )
}
