import express from 'express'
import { TodoAPI, todoAPIBase } from '../src/TodoAPI'
import { Item } from '../src/Item'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

todoAPIBase.configure({
  app,
})

const database = [] as Item[]

TodoAPI.addItem.implement(req => {
  const newItem: Item = {
    id: new Date().valueOf().toString(),
    label: req.body.label,
    completed: false,
  }
  database.push(newItem)
  return newItem
})

TodoAPI.getItems.implement(() => {
  return database
})

TodoAPI.updateCompleted.implement(req => {
  const { id } = req.params
  const item = database.find(record => record.id === id)
  if (!item) throw new Error('Not found')
  item.completed = req.query.completed
  return item
})

const port = +(process.env.PORT || 0) || 4000
app.listen(port)
console.log('Listening in port', port)
