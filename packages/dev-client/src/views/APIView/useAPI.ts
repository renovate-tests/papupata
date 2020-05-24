import { useRoute } from 'react-router5'
import { apiContext } from '../../apiContext'
import { useContext } from 'react'

export function useAPI() {
  const apiName = useRoute().route?.params?.apiName
  const data = useContext(apiContext)
  return data.find((api) => api.name === apiName)
}
