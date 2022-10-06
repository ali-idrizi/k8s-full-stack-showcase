import { AxiosRequestConfig } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { TodoApi } from './todo'
import { UserApi } from './user'

export type Api = {
  user: UserApi
  todo: TodoApi
}

export const createApi = (context?: GetServerSidePropsContext): Api => {
  let config: AxiosRequestConfig | undefined

  if (context) {
    const userId = context.req.headers['x-user-id']

    if (userId && typeof userId === 'string') {
      config = {
        headers: {
          'x-user-id': userId,
          'x-authenticated': 'true',
        },
      }
    }
  }

  return {
    user: new UserApi(config),
    todo: new TodoApi(config),
  }
}

export const API = createApi()

export { ApiError } from './error'
