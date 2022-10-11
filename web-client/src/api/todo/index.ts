import { ApiClientConfig } from '../client'
import { TodoItemApi } from './item'
import { TodoListApi } from './list'

export class TodoApi {
  list: TodoListApi
  item: TodoItemApi

  constructor(config?: ApiClientConfig) {
    this.list = new TodoListApi(config)
    this.item = new TodoItemApi(config)
  }
}
