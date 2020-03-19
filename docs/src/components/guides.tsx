import React, { ReactNode } from 'react'
import { Section, SectionHeading } from './api-components'
import styled from 'styled-components'

export function Overview({ children }: { children: ReactNode }) {
  return (
    <Section>
      <SectionHeading>Overview</SectionHeading>
      {children}
    </Section>
  )
}

interface GuidePart {
  heading: ReactNode
  anchor: string
  content: ReactNode
  level?: number
}

const Level0 = styled.h4``
const Level1= styled.h5`
  font-size: 1.1em;
`

export function GuideContent({ content }: { content: GuidePart[] }) {
  return (
    <div>
      <Section>
        <SectionHeading>Table of contents</SectionHeading>
        <ul>
          {content.map(child => (
            <li style={{ marginLeft: 18 * (child.level || 0) }} key={child.anchor}>
              <a href={`#${child.anchor}`}>{child.heading}</a>
            </li>
          ))}
        </ul>
      </Section>
      {content.map(child => {
        const Heading = !child.level ? Level0 : Level1
        return (
          <Section id={child.anchor} key={child.anchor}>
            <Heading>{child.heading}</Heading>
            {child.content}
          </Section>
        )
      })}
    </div>
  )
}

export const FixedFont = styled.span`
  font-family: "Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace
`
