import { Section, SectionHeading } from './api-components'
import React, { createContext, useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Row = styled.tr``
const NameColumnBase = styled.td``
const TypeColumn = styled.td``
const DataTypeColumn = styled.td``
const DescriptionColumn = styled.td``
const RequiredColumn = styled.td``

const MemberContext = createContext({ context: '' })

const NameColumn: React.FC<{ name: string }> = ({ name, children }) => {
  const { context } = useContext(MemberContext)
  return (
    <NameColumnBase>
      <Link to={`/api/${context}/${name}`}>{children || name}</Link>
    </NameColumnBase>
  )
}

export const Members: React.FC<{ context: string; includeRequiredColumn?: boolean }> = ({ children, context, includeRequiredColumn }) => {
  return (
    <Section>
      <MemberContext.Provider value={{ context }}>
        <SectionHeading>Members</SectionHeading>
        <table>
          <thead>
            <th>Name</th>
            <th>Type</th>
            <th>Data type/return type</th>
            <th>Description</th>
            {includeRequiredColumn && <th>Required</th>}
          </thead>
          <tbody>{children}</tbody>
        </table>
      </MemberContext.Provider>
    </Section>
  )
}
export const MethodMember: React.FC<{ name: string; dataType: any; required?: any; displayName?: any }> = ({
  children,
  name,
  dataType,
  required,
  displayName
}) => {
  return (
    <Row>
      <NameColumn name={name}>{displayName}</NameColumn>
      <TypeColumn>method</TypeColumn>
      <DataTypeColumn>{dataType}</DataTypeColumn>
      <DescriptionColumn>{children}</DescriptionColumn>
      {required !== undefined && <RequiredColumn>{required === true ? 'Yes' : required === false ? 'No' : required}</RequiredColumn>}
    </Row>
  )
}

export const PropertyMember: React.FC<{ name: string; dataType: any; required?: any }> = ({ children, name, dataType, required }) => {
  return (
    <Row>
      <NameColumnBase>{name}</NameColumnBase>
      <TypeColumn>property</TypeColumn>
      <DataTypeColumn>{dataType}</DataTypeColumn>
      <DescriptionColumn>{children}</DescriptionColumn>
      {required !== undefined && <RequiredColumn>{required === true ? 'Yes' : required === false ? 'No' : required}</RequiredColumn>}
    </Row>
  )
}

export const ExposedTypeMember: React.FC<{ name: string }> = ({ children, name }) => {
  return (
    <Row>
      <NameColumnBase>{name}</NameColumnBase>
      <TypeColumn>property</TypeColumn>
      <DataTypeColumn>n/a</DataTypeColumn>
      <DescriptionColumn>{children}. Type type itself must be accessed using the typeof operator.</DescriptionColumn>
    </Row>
  )
}
