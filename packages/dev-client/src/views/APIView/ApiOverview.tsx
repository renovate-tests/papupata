import { useAPI } from './useAPI'
import { useCallback } from 'react'
import navigate from '../../navigate'
import React from 'react'
import { ActionButton } from '../../commonStyles'
import PastRequestList from './PastRequestList'
import { mutateStore } from '../../utils/store'
import { useConfig } from '../../config'
import set from 'lodash/set'
import { v4 as uuid } from 'uuid'

export default function ApiOverview() {
  const api = useAPI()
  const config = useConfig()

  const makeRequest = useCallback(() => {
    mutateStore((store) => {
      if (!store.apis?.[api!.name]?.currentRequest?.request?.headers) {
        set(
          store,
          ['apis', api!.name, 'currentRequest', 'request', 'headers'],
          config.suggestedHeaders?.map((header) => ({
            ...header,
            internalId: uuid(),
          }))
        )
      }
    })
    navigate.newRequest(api!.name)
  }, [api, config])
  if (!api) return null

  return (
    <div>
      <ActionButton onClick={makeRequest}>Make request</ActionButton>
      <PastRequestList apiName={api.name} />
    </div>
  )
}
