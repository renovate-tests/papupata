import { useAPI } from './useAPI'
import { useCallback } from 'react'
import navigate from '../../navigate'
import React from 'react'
import { ActionButton } from '../../commonStyles'
import PastRequestList from './PastRequestList'

export default function ApiOverview() {
  const api = useAPI()
  const makeRequest = useCallback(() => navigate.newRequest(api!.name), [api])
  if (!api) return null

  return (
    <div>
      <ActionButton onClick={makeRequest}>Make request</ActionButton>
      <PastRequestList apiName={api.name} />
    </div>
  )
}
