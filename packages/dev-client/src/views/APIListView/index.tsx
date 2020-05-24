import React, { useContext } from 'react'
import { PageHeader } from '../../commonStyles'
import { apiContext } from '../../apiContext'
import ListedAPI from './ListedAPI'

export default function APIListView() {
  const apis = useContext(apiContext)
  return (
    <>
      {' '}
      <PageHeader>List of APIs</PageHeader>
      {apis.map((api) => (
        <ListedAPI key={api.name} api={api} />
      ))}
    </>
  )
}
