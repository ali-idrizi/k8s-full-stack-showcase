import { TodoList } from '@/utils/types'
import { AxiosRequestConfig } from 'axios'
import { ApiClient } from '../client'

export class TodoListApi {
  private client: ApiClient

  constructor(config?: AxiosRequestConfig) {
    this.client = new ApiClient({
      baseURL: '/api/todo/list',
      ...config,
    })
  }

  async getAll(): Promise<TodoList[]> {
    const res = await this.client.get<TodoList[]>('/')

    return res.data
  }

  async getOne(id: string): Promise<TodoList> {
    const res = await this.client.get<TodoList>(`/${id}`)

    return res.data
  }
}
