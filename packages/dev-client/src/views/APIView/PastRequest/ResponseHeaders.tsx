import React from 'react'
import { PPHeader } from '../../../utils/store'

export default function ResponseHeaders({ headers }: { headers: PPHeader[] }) {
  return (
    <div>
      <h3>Headers</h3>
      <table>
        <tbody>
          {headers.map((header) => (
            <tr key={header.name}>
              <td>{header.name}</td>
              <td>{header.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
