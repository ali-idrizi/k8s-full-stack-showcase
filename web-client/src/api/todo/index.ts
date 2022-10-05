import { ApiClient } from '../client'
import { list } from './list'

export const TodoClient = new ApiClient({
  baseURL: '/api/todo',
})

export const TodoApi = {
  list,
}
