import React, { useCallback } from 'react'
import { PageHeader } from '../../commonStyles'
import { useAPI } from './useAPI'
import RouteComponent from '../../RouteComponent'
import navigate from '../../navigate'
import styled from 'styled-components'

const A = styled.a`
  color: darkblue;
  cursor: pointer;
  transition: color 200ms linear;
  &:hover {
    color: blue;
    text-decoration: underline;
  }
`

export default function APIView() {
  const api = useAPI()
  const navigateToAPI = useCallback(() => navigate.toAPI(api!.name), [api])
  if (!api) return null

  return (
    <>
      <PageHeader>
        <A onClick={navigateToAPI}>{api.name}</A>
      </PageHeader>
      <RouteComponent />
    </>
  )
}
