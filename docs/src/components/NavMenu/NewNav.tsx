import { NavEntries, NavEntry } from './NavEntries'
import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import { Location } from '@reach/router'
import styled from 'styled-components'

interface Props {
  entries: NavEntries
}

type IsCurrentFn = (url: string) => boolean

const NavLink = styled(Link)`
  display: block;
  ${({ current }: { current: string }) =>
    current === 'true'
      ? `
  
  font-weight: bold;
  `
      : ''};
`

const Indent = styled.div`
  margin-left: 20px;
`

export default function NewNav({ entries }: Props) {
  return (
    <StaticQuery
      query={graphql`
        query GetPathPRefix {
          site {
            pathPrefix
          }
        }
      `}
      render={({ site: { pathPrefix } }: { site: { pathPrefix: string } }) => (
        <Location>
          {({ location }) => <NewNavList entries={entries} isCurrent={link => [pathPrefix + link, link].includes(location.pathname)} />}
        </Location>
      )}
    />
  )
}

function NewNavList({ entries, isCurrent }: Props & { isCurrent: IsCurrentFn }) {
  return (
    <>
      {Object.entries(entries).map(([url, entry]) => (
        <NewNavEntry key={url} entry={entry} url={url} isCurrent={isCurrent} />
      ))}
    </>
  )
}

interface EntryProps {
  entry: NavEntry
  isCurrent: IsCurrentFn
  url: string
}

function NewNavEntry({ entry, isCurrent, url }: EntryProps) {
  const self = (
    <NavLink current={isCurrent(url) ? 'true' : 'false'} to={url}>
      {typeof entry === 'object' && entry && 'label' in entry ? entry.label : entry}
    </NavLink>
  )
  const children =
    typeof entry === 'object' && entry && 'children' in entry && entry.children ? (
      <Indent>
        <NewNavList entries={entry.children as any} isCurrent={isCurrent} />
      </Indent>
    ) : null

  return (
    <>
      {self}
      {children}
    </>
  )
}
