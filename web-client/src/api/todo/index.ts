import { AxiosRequestConfig } from 'axios'
import { TodoListApi } from './list'

export class TodoApi {
  list: TodoListApi

  constructor(config?: AxiosRequestConfig) {
    this.list = new TodoListApi(config)
  }
}
