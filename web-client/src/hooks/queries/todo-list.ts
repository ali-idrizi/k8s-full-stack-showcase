import { API, ApiError } from '@/api'
import { QUERY_KEY } from '@/utils/constants'
import { TodoList } from '@/utils/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useTodoLists = (): UseQueryResult<TodoList[], ApiError> => {
  return useQuery([QUERY_KEY.TODO, QUERY_KEY.TODO_LISTS], API.todo.list.getAll, {
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
  })
}

export enum FilterItemsBy {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
export const useTodoList = (
  id: string,
  filter: FilterItemsBy,
): UseQueryResult<TodoList, ApiError> => {
  return useQuery([QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, id], () => API.todo.list.getOne(id), {
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
    select: (list) => ({
      ...list,
      items: list.items?.filter((item) => {
        switch (filter) {
          case FilterItemsBy.COMPLETED:
            return item.completed
          case FilterItemsBy.ACTIVE:
            return !item.completed
          default:
            return true
        }
      }),
    }),
  })
}

export const useTodoListItemCount = (id: string): number => {
  return useTodoList(id, FilterItemsBy.ALL).data?.items?.length ?? 0
}
