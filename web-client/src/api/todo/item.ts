import { isServer } from '@/utils/env'
import { TodoItem } from '@/utils/types'
import { bool, InferType, object, string } from 'yup'
import { ApiClient, ApiClientConfig } from '../client'

export const CreateTodoItemSchema = object({
  title: string().trim().required('Title cannot be empty'),
  listId: string().required(),
})
export type CreateTodoItemPayload = InferType<typeof CreateTodoItemSchema>

export const UpdateTodoItemSchema = object({
  title: string().trim().min(1, 'Title cannot be empty'),
  completed: bool(),
})
export type UpdateTodoItemPayload = InferType<typeof UpdateTodoItemSchema>

export class TodoItemApi {
  private client: ApiClient

  constructor(config?: ApiClientConfig) {
    this.client = new ApiClient({
      baseURL: isServer() ? 'http://app-todo/item' : '/api/todo/item',
      ...config,
    })
  }

  create = async (payload: CreateTodoItemPayload): Promise<TodoItem> => {
    const res = await this.client.post<TodoItem>('/', payload)

    return res.data
  }

  update = async (id: string, payload: UpdateTodoItemPayload): Promise<TodoItem> => {
    const res = await this.client.patch<TodoItem>(`/${id}`, payload)

    return res.data
  }

  delete = async (id: string): Promise<void> => {
    await this.client.delete(`/${id}`)
  }
}
