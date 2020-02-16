import { NavEntries, NavEntry } from './NavEntries'
import React, { useState } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import { Location } from '@reach/router'
import styled from 'styled-components'

interface Props {
  entries: NavEntries
}

type IsCurrentFn = (url: string) => boolean

const LinkContainer = styled.div``

const NavLink = styled(Link)`
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

const Toggler = styled.span`
  display: inline-block;
  margin: 0 5px 0 -17px;
  user-select: none;
  transition: transform 150ms linear;
  &:hover {
    color: blue;
    cursor: pointer;
  }
`
const TogglerSupport = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  left: -10000px;
  &:not(:checked) ~ ${Indent} {
    display: none;
  }
  &:checked ~ ${LinkContainer} > ${Toggler} {
    transform: rotate(90deg);
  }
`
const Container = styled.label``

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
  const link = (
    <NavLink current={isCurrent(url) ? 'true' : 'false'} to={url}>
      {typeof entry === 'object' && entry && 'label' in entry ? entry.label : entry}
    </NavLink>
  )
  const children =
    typeof entry === 'object' && entry && 'children' in entry && entry.children ? (
      <Indent>
        <NewNavList entries={entry.children as NavEntries} isCurrent={isCurrent} />
      </Indent>
    ) : null

  const showChildren = isCurrent(url) || isAChildSelected(entry, isCurrent)
  const [checked, setChecked] = useState(showChildren)

  return (
    <Container>
      <TogglerSupport checked={checked} />
      <LinkContainer>
        {children && (
          <Toggler
            onClick={e => {
              e.preventDefault()
              setChecked(s => !s)
            }}
          >
            {'>'}
          </Toggler>
        )}
        {link}
      </LinkContainer>
      {children}
    </Container>
  )
}

function isAChildSelected(entry: NavEntry, isCurrent: IsCurrentFn): boolean {
  if (typeof entry !== 'object' || !entry || !('children' in entry)) return false
  return Object.entries(entry.children as NavEntries).some(child => {
    return isCurrent(child[0]) || isAChildSelected(child[1], isCurrent)
  })
}
