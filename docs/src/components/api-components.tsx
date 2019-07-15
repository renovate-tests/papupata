import styled from 'styled-components'
import React from 'react'
import { Code } from './Code'

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
export const Usage: React.FC = ({ children }) => {
  return (
    <Section>
      <SectionHeading>Usage</SectionHeading>
      {children}
    </Section>
  )
}
export const Parameters: React.FC = ({ children }) => {
  return (
    <Section>
      <SectionHeading>Parameters</SectionHeading>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </Section>
  )
}

export const Parameter: React.FC<{ name: string; dataType: any }> = ({ children, name, dataType }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{dataType}</td>
      <td>{children}</td>
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
