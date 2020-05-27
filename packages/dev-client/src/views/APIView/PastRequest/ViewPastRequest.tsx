import { useRoute } from 'react-router5'
import React, { useCallback, useMemo } from 'react'
import { getStore, mutateStore } from '../../../utils/store'
import BodyView from './BodyView'
import HeaderList from './HeaderList'
import { ActionButton, DeleteActionButton, SecondaryActionButton } from '../../../commonStyles'
import navigate from '../../../navigate'
import styled from 'styled-components'

const Actions = styled.div`
  float: right;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export default function ViewPastRequest() {
  const { apiName, requestName } = useRoute().route?.params || {}
  const req = useMemo(() => {
    return getStore().apis?.[apiName]?.pastRequests?.[requestName]
  }, [apiName, requestName])

  const createNewRequestBasedOnThis = useCallback(() => {
    mutateStore((store) => {
      store.apis![apiName]!.currentRequest = {
        ...req!,
        response: undefined,
        sent: undefined,
      }
    })
    navigate.newRequest(apiName)
  }, [apiName, req])

  const saveRequest = useCallback(() => {
    const name = window.prompt('Enter name to save as')
    if (!name) return
    if (name === 'latest') {
      alert('Cannot save as "latest"')
      return
    }
    if (getStore().apis?.[apiName]?.pastRequests?.[name]) {
      if (!window.prompt('Overwrite ' + name + '?')) {
        return
      }
    }

    mutateStore((store) => {
      store.apis![apiName]!.pastRequests![name] = req!
      navigate.toPastRequest(apiName, name)
    })
  }, [req, apiName])

  const renameRequest = useCallback(() => {
    const name = window.prompt('Enter name to save as', requestName)
    if (!name) return
    if (name === requestName) return
    if (name === 'latest') {
      alert('Cannot save as "latest"')
      return
    }
    if (getStore().apis?.[apiName]?.pastRequests?.[name]) {
      if (!window.prompt('Overwrite ' + name + '?')) {
        return
      }
    }

    mutateStore((store) => {
      store.apis![apiName]!.pastRequests![name] = req!
      store.apis![apiName]!.pastRequests![requestName] = undefined
      navigate.toPastRequest(apiName, name)
    })
  }, [req, apiName, requestName])

  const handleDelete = useCallback(() => {
    if (!window.confirm('Are you sure you want to delete?')) return
    mutateStore((store) => {
      store.apis![apiName]!.pastRequests![requestName] = undefined
      navigate.toAPI(apiName)
    })
  }, [req, apiName, requestName])

  if (!req) return null
  const { response, request } = req
  if (!response || !request) return null
  return (
    <div>
      <Actions>
        <ActionButton onClick={createNewRequestBasedOnThis}>New request based on this</ActionButton>
        {requestName === 'latest' ? (
          <SecondaryActionButton onClick={saveRequest}>Save</SecondaryActionButton>
        ) : (
          <SecondaryActionButton onClick={renameRequest}>Rename</SecondaryActionButton>
        )}
        <DeleteActionButton onClick={handleDelete}>Delete</DeleteActionButton>
      </Actions>
      <h3>{requestName}</h3>
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
      {request.body && (
        <BodyView heading={'Body'}>
          {typeof request.body === 'object' ? JSON.stringify(request.body, null, 2) : request.body}
        </BodyView>
      )}
      {request.headers && <HeaderList headers={request.headers} />}
    </div>
    // TODO: include auth headers
  )
}
