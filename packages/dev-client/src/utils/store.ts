interface StoreData {
  authentication?: {
    token?: string
    username?: string
    password?: string
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
