import { isServer } from '@/utils/env'
import { TodoList } from '@/utils/types'
import { ApiClient, ApiClientConfig } from '../client'

export class TodoListApi {
  private client: ApiClient

  constructor(config?: ApiClientConfig) {
    this.client = new ApiClient({
      baseURL: isServer() ? 'http://app-todo/list' : '/api/todo/list',
      ...config,
    })
  }

  getAll = async (): Promise<TodoList[]> => {
    const res = await this.client.get<TodoList[]>('/')

    return res.data
  }

  getOne = async (id: string): Promise<TodoList> => {
    const res = await this.client.get<TodoList>(`/${id}`)

    return res.data
  }
}
