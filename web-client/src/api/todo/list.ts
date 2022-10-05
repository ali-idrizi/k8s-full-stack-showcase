import { TodoList } from '@/utils/types'
import { TodoClient } from '.'

const getAll = async (): Promise<TodoList[]> => {
  const res = await TodoClient.get<TodoList[]>('/list')

  return res.data
}

const getOne = async (id: string): Promise<TodoList> => {
  const res = await TodoClient.get<TodoList>(`/list/${id}`)

  return res.data
}

export const list = {
  getAll,
  getOne,
}
