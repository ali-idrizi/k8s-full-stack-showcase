import { isServer } from '@/utils/env'
import { TodoList } from '@/utils/types'
import { InferType, object, string } from 'yup'
import { ApiClient, ApiClientConfig } from '../client'

export const CreateTodoListSchema = object({
  title: string().trim().required('Title cannot be empty'),
})
export type CreateTodoListPayload = InferType<typeof CreateTodoListSchema>

export const UpdateTodoListSchema = object({
  title: string().trim().min(1, 'Title cannot be empty'),
})
export type UpdateTodoListPayload = InferType<typeof UpdateTodoListSchema>

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

  create = async (payload: CreateTodoListPayload): Promise<TodoList> => {
    const res = await this.client.post<TodoList>('/', payload)

    return res.data
  }

  update = async (id: string, payload: UpdateTodoListPayload): Promise<TodoList> => {
    const res = await this.client.patch<TodoList>(`/${id}`, payload)

    return res.data
  }
}
