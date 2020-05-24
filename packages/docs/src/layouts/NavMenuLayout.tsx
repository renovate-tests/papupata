import React from 'react'
import NavMenu from '../components/NavMenu/NavMenu'
import styled from 'styled-components'

interface Props {
  children: any
}

const Layout = styled.div`
  display: flex;
`

export default function NavMenuLayout({ children }: Props) {
  return (
    <Layout>
      <NavMenu />
      {children}
    </Layout>
  )
}
