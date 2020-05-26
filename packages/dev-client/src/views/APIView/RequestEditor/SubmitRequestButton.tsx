import React, { useCallback } from 'react'
import { ActionButton } from '../../../commonStyles'
import { mutateStore } from '../../../utils/store'
import { useAPI } from '../useAPI'
import navigate from '../../../navigate'
import makeRequest from '../../../makeRequest'
import { useConfig } from '../../../config'

export default function SubmitRequestButton() {
  const api = useAPI(),
    config = useConfig()

  const submitRequest = useCallback(() => {
    if (!api) return
    mutateStore((data) => {
      let dataApi = data.apis?.[api?.name ?? '']
      const currentRequest = dataApi?.currentRequest
      if (!currentRequest || !dataApi) return
      if (!dataApi.pastRequests) dataApi.pastRequests = {}
      dataApi.pastRequests.latest = { ...currentRequest, sent: undefined, response: undefined }
    })
    makeRequest(config, api, 'latest')
    navigate.toWaitForResponse(api?.name ?? '', 'latest')
  }, [config, api])
  return (
    <ActionButton onClick={submitRequest} style={{ width: '100%' }}>
      Send Request
    </ActionButton>
  )
}
