import { ApiClientConfig } from './client'
import { TodoApi } from './todo'
import { UserApi } from './user'

export class API {
  user: UserApi
  todo: TodoApi

  constructor(config?: ApiClientConfig) {
    this.user = new UserApi(config)
    this.todo = new TodoApi(config)
  }
}

export { ApiError } from './error'
export { UserApi } from './user'
