import React, { useContext, useState, useCallback } from 'react'
import { useConfig } from '../../../../config'
import getAuthHeaders from '../../../../utils/getAuthHeaders'
import SingleHeaderEditor from './SingleHeaderEditor'
import { useLiveEdit } from '../LiveEditContext'

export default function AuthHeader() {
  const authHeaderEditor = useLiveEdit(['request', 'sendAuthHeader'])
  const checked = authHeaderEditor.value ?? true
  const config = useConfig()
  const authHeaders = getAuthHeaders(config)
  const asRequestHeaders = Object.entries(authHeaders).map(([name, value]) => ({
    name,
    value: (value as any) as string,
    internalId: name,
  }))

  const updateChecked = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    authHeaderEditor.setValue(e.target.checked)
  }, [])

  if (!asRequestHeaders.length) return null
  return (
    <div>
      <label>
        <input type={'checkbox'} checked={checked} onChange={updateChecked} /> Include authentication headers
      </label>
      <div style={{ opacity: checked ? 1 : 0.5 }}>
        {asRequestHeaders.map((header) => (
          <SingleHeaderEditor key={header.name} header={header} index={0} disabled />
        ))}
      </div>
    </div>
  )
}
