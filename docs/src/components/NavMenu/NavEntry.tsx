import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Location } from '@reach/router'

interface Props {
  link: string
  children: any
}

const NavLink = styled(Link)`
  ${({ current }: { current: boolean }) =>
    current &&
    `
  
  font-weight: bold;
  `};
`

export default function NavEntry({ link, children }: Props) {
  return (
    <div>
      <Location>
        {({ location }) => (
          <NavLink current={location.pathname === link} to={link}>
            {children}
          </NavLink>
        )}
      </Location>
    </div>
  )
}
