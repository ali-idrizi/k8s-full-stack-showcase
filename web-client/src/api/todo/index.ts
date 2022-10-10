import { ApiClientConfig } from '../client'
import { TodoListApi } from './list'

export class TodoApi {
  list: TodoListApi

  constructor(config?: ApiClientConfig) {
    this.list = new TodoListApi(config)
  }
}
