import { APIDeclaration } from 'papupata'
import { Item } from './Item'

export const todoAPIBase = new APIDeclaration()

export const TodoAPI = {
  addItem: todoAPIBase
    .declarePutAPI('/item')
    .body<{ label: string }>()
    .response<Item>(),
  getItems: todoAPIBase.declareGetAPI('/items').response<Item[]>(),
  updateCompleted: todoAPIBase
    .declarePutAPI('/item/:id/completed')
    .params(['id'] as const)
    .queryBool(['completed'] as const)
    .response<Item>(),
}
