import { Item } from './Item'
import React from 'react'
import { TodoAPI } from './TodoAPI'

interface Props {
  item: Item
  onUpdateItem: (item: Item) => void
}

export default function TodoItem({ item, onUpdateItem }: Props) {
  return (
    <tr>
      <td>
        <input type="checkbox" checked={item.completed} onChange={(e) => updateChecked(e.target.checked)} />
      </td>
      <td>{item.label}</td>
    </tr>
  )

  async function updateChecked(completed: boolean) {
    const updatedItem = await TodoAPI.updateCompleted({ id: item.id, completed })
    onUpdateItem(updatedItem)
  }
}
