import React from 'react'
import { PageHeader } from '../../commonStyles'
import { useAPI } from './useAPI'
import RouteComponent from '../../RouteComponent'

export default function APIView() {
  const api = useAPI()
  if (!api) return null

  return (
    <>
      <PageHeader>{api.name}</PageHeader>
      <RouteComponent />
    </>
  )
}
