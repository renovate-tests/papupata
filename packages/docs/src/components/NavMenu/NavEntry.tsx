import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
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
      <StaticQuery
        query={graphql`
          query GetPathPRefix2 {
            site {
              pathPrefix
            }
          }
        `}
        render={({ site: { pathPrefix } }: { site: { pathPrefix: string } }) => (
          <Location>
            {({ location }) => (
              <NavLink current={[pathPrefix + link, link].includes(location.pathname) ? 'true' : 'false'} to={link}>
                {children}
              </NavLink>
            )}
          </Location>
        )}
      />
    </div>
  )
}
