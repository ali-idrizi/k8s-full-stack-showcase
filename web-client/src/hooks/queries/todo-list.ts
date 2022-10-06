import { API, ApiError } from '@/api'
import { QUERY_KEY } from '@/utils/constants'
import { TodoList } from '@/utils/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useTodoLists = (): UseQueryResult<TodoList[], ApiError> => {
  return useQuery([QUERY_KEY.TODO, QUERY_KEY.TODO_LISTS], API.todo.list.getAll)
}

export const useTodoList = (id: string): UseQueryResult<TodoList, ApiError> => {
  return useQuery([QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, id], () => API.todo.list.getOne(id))
}
