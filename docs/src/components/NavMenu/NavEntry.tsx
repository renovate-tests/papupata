import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Location } from '@reach/router'

interface Props {
  link: string
  children: any
}

const NavLink = styled(Link)`
  ${({ current }: { current: string }) =>
    current === 'true'
      ? `
  
  font-weight: bold;
  `
      : ''};
`

export default function NavEntry({ link, children }: Props) {
  return (
    <div>
      <Location>
        {({ location }) => (
          <NavLink current={location.pathname === link ? 'true' : 'false'} to={link}>
            {children}
          </NavLink>
        )}
      </Location>
    </div>
  )
}
