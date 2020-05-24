import React, { useCallback } from 'react'
import { StoredHeader } from './HeaderEditor'
import SlowDeleteButton from '../../../../components/SlowDeleteButton'

interface Props {
  header: StoredHeader
  index: number
  onUpdateHeader?(index: number, name: string, label: string): void
  onRemoveHeader?(index: number): void
  disabled?: boolean
}

export default function SingleHeaderEditor({ header, index, onUpdateHeader, onRemoveHeader, disabled }: Props) {
  const updateName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateHeader?.(index, e.target.value, header.value)
    },
    [onUpdateHeader, index, header]
  )
  const updateValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateHeader?.(index, header.name, e.target.value)
    },
    [onUpdateHeader, index, header]
  )

  const handleRemoveHeader = useCallback(() => {
    onRemoveHeader?.(index)
  }, [onRemoveHeader])

  return (
    <div>
      <input value={header.name || ''} onChange={updateName} disabled={disabled} />
      {': '}
      <input value={header.value || ''} onChange={updateValue} disabled={disabled} />
      {onRemoveHeader && <SlowDeleteButton onClick={handleRemoveHeader} />}
    </div>
  )
}
