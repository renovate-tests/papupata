import { useEffect } from 'react'

export default function useAutoFocusInput(inputRef: React.RefObject<HTMLInputElement>) {
  // eslint-disable-next-line
  useEffect(() => inputRef.current?.focus(), [!!inputRef.current])
}
