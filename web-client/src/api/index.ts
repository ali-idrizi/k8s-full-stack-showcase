import { AxiosRequestConfig } from 'axios'
import { TodoApi } from './todo'
import { UserApi } from './user'

export type Api = {
  user: UserApi
  todo: TodoApi
}

export const createApi = (config?: AxiosRequestConfig): Api => {
  return {
    user: new UserApi(config),
    todo: new TodoApi(config),
  }
}

export const API = createApi()

export { ApiError } from './error'
