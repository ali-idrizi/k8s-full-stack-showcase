import { ApiClientConfig } from './client'
import { TodoApi } from './todo'
import { UserApi } from './user'

export type Api = {
  user: UserApi
  todo: TodoApi
}

export const createApi = (config?: ApiClientConfig): Api => {
  return {
    user: new UserApi(config),
    todo: new TodoApi(config),
  }
}

export const API = createApi({
  withRefreshTokenInterceptor: true,
})

export { ApiError } from './error'
