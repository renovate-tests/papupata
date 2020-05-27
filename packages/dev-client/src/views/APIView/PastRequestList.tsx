import React, { useMemo } from 'react'
import { getStore } from '../../utils/store'
import { Link } from 'react-router5'

interface Props {
  apiName: string
}

export default function PastRequestList({ apiName }: Props) {
  const pastRequests = useMemo(() => getStore().apis?.[apiName]?.pastRequests, [apiName])

  return (
    <div>
      <h3>Past requests</h3>
      {!pastRequests ? (
        <p>None exist.</p>
      ) : (
        <ul>
          {Object.entries(pastRequests)
            .filter(([name, req]) => req.sent)
            .map(([name, request]) => (
              <li key={name}>
                <Link routeName={'viewAPI.viewPastRequest'} routeParams={{ apiName, requestName: name }}>
                  {name} ({request.response && new Date(request.response?.timestamp).toISOString()})
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
