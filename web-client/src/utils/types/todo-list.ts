import { TodoItem } from './todo-item'

export type TodoList = {
  id: string
  userId: string
  title: string
  default: boolean
  items?: TodoItem[]
}
