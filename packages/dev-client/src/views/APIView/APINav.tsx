import React, { useContext } from 'react'
import { apiContext } from '../../apiContext'
import NavAPI from './NavAPI'

export default function APINav() {
  const apis = useContext(apiContext)
  return (
    <>
      {' '}
      {apis.map((api) => (
        <NavAPI key={api.name} api={api} />
      ))}
    </>
  )
}
