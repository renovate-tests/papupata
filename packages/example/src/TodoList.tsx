import { useState } from 'react'
import React from 'react'
import TodoItem from './TodoItem'
import { Item } from './Item'
import AddNewItem from './AddNewItem'
import { TodoAPI } from './TodoAPI'

export default function TodoList() {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState(null as null | Item[])

  if (loading) {
    return <div>Loading...</div>
  }
  if (items === null) {
    setLoading(true)
    TodoAPI.getItems({}).then((items) => {
      setItems(items)
      setLoading(false)
    })
    return null
  }

  return (
    <div>
      <table>
        <tbody>
          {items.map((item) => (
            <TodoItem onUpdateItem={updateItem} key={item.id} item={item} />
          ))}
          <tr>
            <td>
              <AddNewItem onAdd={(newItem) => setItems([...items, newItem])} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  function updateItem(item: Item) {
    if (!items) throw new Error('Internal error')
    const match = items.find((i) => i.id === item.id)
    if (match) {
      const index = items.indexOf(match)
      setItems([...items.slice(0, index), item, ...items.slice(index + 1)])
    } else {
      setItems([...items, item])
    }
  }
}
