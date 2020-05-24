import { PageHeader } from '../../../commonStyles'
import React from 'react'

export default function ForbiddenView() {
  return (
    <>
      <PageHeader>Forbidden</PageHeader>
      <p>You must be logged in to access this tool.</p>
    </>
  )
}
