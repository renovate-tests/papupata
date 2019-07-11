import React, { useState } from 'react'
import { Item } from './Item'
import { TodoAPI } from './TodoAPI'

interface Props {
  onAdd: (item: Item) => void
}

export default function AddNewItem({ onAdd }: Props) {
  const [value, setValue] = useState('')
  return (
    <form onSubmit={e => e.preventDefault()}>
      <input type="text" placeholder="Label for new item" value={value} onChange={e => setValue(e.target.value)} />
      <button disabled={!value.trim()} onClick={add}>Add</button>
    </form>
  )

  async function add() {
    setValue('')
    const item = await TodoAPI.addItem({ label: value })
    onAdd(item)
  }
}
