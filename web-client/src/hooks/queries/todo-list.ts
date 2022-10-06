import { API, ApiError } from '@/api'
import { TodoList } from '@/utils/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useTodoLists = (): UseQueryResult<TodoList[], ApiError> => {
  return useQuery(['todo', 'lists'], API().todo.list.getAll)
}

export const useTodoList = (id: string): UseQueryResult<TodoList, ApiError> => {
  return useQuery(['todo', 'list', id], () => API().todo.list.getOne(id))
}
