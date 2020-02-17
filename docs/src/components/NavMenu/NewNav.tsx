import { NavEntries, NavEntry } from './NavEntries'
import React, { ReactNode, useState } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import { Location } from '@reach/router'
import styled from 'styled-components'

interface Props {
  entries: NavEntries
}

type IsCurrentFn = (url: string) => boolean

const LinkContainer = styled.div``
export type AltComponentType = React.FC<{
  children: ReactNode
  label: ReactNode
  showChildren: boolean
  url: string | null
  description: ReactNode | undefined
}>

const NavLink = styled(Link)`
  ${({ current }: { current: string }) =>
    current === 'true'
      ? `

  font-weight: bold;
  `
      : ''};
`

const NonLink = styled.span`
  color: #777;
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
  position: absolute;
  margin-left: -17px;
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
          {({ location }) => (
            <NewNavList entries={entries} isCurrent={link => [pathPrefix + link, link].includes(location.pathname)} AltComponent={null} />
          )}
        </Location>
      )}
    />
  )
}

export function NewNavList({
  entries,
  isCurrent,
  AltComponent
}: Props & { isCurrent: IsCurrentFn; AltComponent: AltComponentType | null }) {
  return (
    <>
      {Object.entries(entries).map(([url, entry]) => (
        <NewNavEntry key={url} entry={entry} url={url} isCurrent={isCurrent} AltComponent={AltComponent} />
      ))}
    </>
  )
}

interface EntryProps {
  entry: NavEntry
  isCurrent: IsCurrentFn
  url: string
  AltComponent: AltComponentType | null
}

function NewNavEntry({ entry, isCurrent, url, AltComponent }: EntryProps) {
  let label = typeof entry === 'object' && entry && 'label' in entry ? entry.label : entry
  const link = url.startsWith('<') ? (
    <NonLink current={isCurrent(url) ? 'true' : 'false'}>{label}</NonLink>
  ) : (
    <NavLink current={isCurrent(url) ? 'true' : 'false'} to={url}>
      {label}
    </NavLink>
  )
  const children =
    typeof entry === 'object' && entry && 'children' in entry && entry.children ? (
      <Indent>
        <NewNavList entries={entry.children as NavEntries} isCurrent={isCurrent} AltComponent={AltComponent} />
      </Indent>
    ) : null

  const showChildren = isCurrent(url) || isAChildSelected(entry, isCurrent)
  const [checked, setChecked] = useState(showChildren)

  const description = typeof entry === 'object' && entry && 'description' in entry ? entry.description : null
  if (AltComponent) {
    return (
      <AltComponent
        children={children}
        label={label}
        showChildren={showChildren}
        url={url.startsWith('<') ? null : url}
        description={description}
      />
    )
  }

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
