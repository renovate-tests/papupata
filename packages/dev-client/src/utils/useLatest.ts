import { useRef } from 'react'

export default function useLatest() {
  const latestVal = useRef(0)

  return function () {
    const myVal = ++latestVal.current
    return function () {
      return myVal === latestVal.current
    }
  }
}
