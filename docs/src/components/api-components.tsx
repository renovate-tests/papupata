import styled from 'styled-components'
import React from 'react'
import { Code } from './Code'
import { IncludeAvailableFromContext } from './IncludeAvailableFromContext'

export const Section = styled.section``
export const SectionHeading = styled.h4``
export const SubHeading = styled.h5``
export const ExampleCommonContainer = styled.section`
  padding: 15px 30px;
  background: lightyellow;
`

export const Purpose: React.FC = ({ children }) => {
  return (
    <Section>
      <SectionHeading>Purpose</SectionHeading>
      {children}
    </Section>
  )
}

export type ValidVersions = '1.1.0' | '1.2.0'
export const AvailableFrom = ({ version }: { version: ValidVersions }) => {
  return (
    <Section>
      <SectionHeading>Availability</SectionHeading>
      This functionality is available from papupata version {version} onwards.
    </Section>
  )
}

export const Usage: React.FC = ({ children }) => {
  return (
    <Section>
      <SectionHeading>Usage</SectionHeading>
      {children}
    </Section>
  )
}
export const Parameters: React.FC<{ includeAvailableFrom?: boolean }> = ({ children, includeAvailableFrom }) => {
  return (
    <Section>
      <IncludeAvailableFromContext.Provider value={!!includeAvailableFrom}>
        <SectionHeading>Parameters</SectionHeading>
        {children ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                {includeAvailableFrom && <th>Introduced in</th>}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        ) : (
          <p>There are no parameters.</p>
        )}
      </IncludeAvailableFromContext.Provider>
    </Section>
  )
}

export const Parameter: React.FC<{ name: string; dataType: any; availableFrom?: ValidVersions }> = ({
  children,
  name,
  dataType,
  availableFrom = '1.0.0'
}) => {
  const includeAvailableFrom = React.useContext(IncludeAvailableFromContext)
  return (
    <tr>
      <td>{name}</td>
      <td>{dataType}</td>
      <td>{children}</td>
      {includeAvailableFrom && <td>{availableFrom}</td>}
    </tr>
  )
}

export const MethodReturnType: React.FC = ({ children }) => {
  return (
    <Section>
      <SectionHeading>Returns</SectionHeading>
      {children}
    </Section>
  )
}

export const Caveats: React.FC = ({ children }) => {
  return (
    <Section>
      <SectionHeading>Caveats</SectionHeading>
      {children}
    </Section>
  )
}
export const Examples: React.FC<{ children: any }> = ({ children }) => {
  return (
    <Section>
      <SectionHeading>Examples</SectionHeading>
      {children}
    </Section>
  )
}

export const Example: React.FC<{ label?: string; children: string }> = ({ children, label }) => {
  return (
    <>
      {label && <SubHeading>{label}</SubHeading>}
      <Code language={'typescript'}>{children}</Code>
    </>
  )
}

export const ExampleCommon: React.FC<{ children: any }> = ({ children }) => {
  return (
    <ExampleCommonContainer>
      <SubHeading>Common to examples below:</SubHeading>
      {children}
    </ExampleCommonContainer>
  )
}
