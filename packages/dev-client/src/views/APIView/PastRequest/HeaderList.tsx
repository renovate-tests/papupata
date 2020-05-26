import React from 'react'
import { PPHeader } from '../../../utils/store'

export default function HeaderList({ headers }: { headers: PPHeader[] }) {
  return (
    <div>
      <h4>Headers</h4>
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
