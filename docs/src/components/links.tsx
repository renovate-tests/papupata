import React from 'react'
import { Link } from 'gatsby'

export function IncompleteApiDeclarationLink() {
  return <Link to="/api/PartiallyDeclaredAPI">PartiallyDeclaredAPI</Link>
}

export function DeclaredAPILink() {
  return <Link to="/api/DeclaredAPI">DeclaredAPI</Link>
}
