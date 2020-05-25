export interface PPHeader {
  name: string
  value: string
}

interface RequestMeta {
  request: {
    body?: any
    bodyOptions?: any
    headers?: PPHeader[]
    pq: {
      [name: string]: any
    }
    sendAuthHeader?: boolean
  }
  response?: {
    error: string |null
    status: number
    timestamp: number
    data: string
    headers?: PPHeader[]
  }
  sent?: number
}

interface StoreData {
  authentication?: {
    token?: string
    username?: string
    password?: string
  }
  apis: {
    [name: string]: {
      currentRequest?: RequestMeta
      pastRequests?: {
        [name: string]: RequestMeta
      }
    }
  }
}

const localStorageKey = 'papupata-dev-client'

export function getStore(): StoreData {
  return JSON.parse(localStorage.getItem(localStorageKey) || '{}')
}

type MutatorFn = (store: StoreData) => void

export function mutateStore(mutator: MutatorFn) {
  const data = getStore()
  mutator(data)
  localStorage.setItem(localStorageKey, JSON.stringify(data))
}
