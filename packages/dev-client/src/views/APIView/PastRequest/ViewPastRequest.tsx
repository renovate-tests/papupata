import { useRoute } from 'react-router5'
import React, { useMemo } from 'react'
import { getStore } from '../../../utils/store'
import BodyView from './BodyView'
import HeaderList from './HeaderList'

export default function ViewPastRequest() {
  const { apiName, requestName } = useRoute().route?.params || {}
  const req = useMemo(() => {
    return getStore().apis?.[apiName]?.pastRequests?.[requestName]
  }, [apiName, requestName])

  if (!req) return null
  const { response, request } = req
  if (!response || !request) return null
  return (
    <div>
      <div>Timestamp: {new Date(response.timestamp).toISOString()}</div>
      <h3>Response</h3>
      <div>Status: {response.status}</div>
      <div>Duration: {response.duration}ms</div>
      {response.error && <div>Error: {response.error}</div>}
      <BodyView heading={'Body'}>{response.data}</BodyView>
      {response.headers && <HeaderList headers={response.headers} />}
      <hr />
      <h3>Request</h3>
      <BodyView heading={'Path and query parameters'}>{JSON.stringify(request.pq || {}, null, 2)}</BodyView>
      {request.body && <BodyView heading={'Body'}>{request.body}</BodyView>}
      {request.headers && <HeaderList headers={request.headers} />}
    </div>
    // TODO: include auth headers
  )
}
