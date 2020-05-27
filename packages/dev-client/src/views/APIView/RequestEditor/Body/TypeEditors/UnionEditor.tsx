import { UnionApiType } from 'papudoc/dist/jsonAPI'
import React, { useCallback } from 'react'
import { TypeEditor } from '../TypeEditorContext'
import { useTypeEditOptions } from '../TypePathContext'

interface Props {
  type: UnionApiType
  required: boolean
}

interface Options {
  variant?: number
}

export default function UnionEditor({ type, required }: Props) {
  const options = useTypeEditOptions<Options>({})
  const selectedVariant = options.value.variant || 0

  const setVariant = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      options.setValue({ variant: +e.target.value })
    },
    [options]
  )

  const selectedType = type.unionOf[selectedVariant]
  return (
    <div>
      Multiple options; select variant:
      <select value={selectedVariant} onChange={setVariant}>
        {type.unionOf.map((variant, i) => (
          <option value={i}>{variant.name}</option>
        ))}
      </select>
      <hr />
      {selectedType ? (
        <TypeEditor type={selectedType} setupDefaultValue={required} />
      ) : (
        <div>Error: invalid selection</div>
      )}
    </div>
  )
}
