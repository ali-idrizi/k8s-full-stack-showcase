import { ApiError } from '@/api'
import { useApi } from '@/hooks'
import { QUERY_KEY } from '@/utils/constants'
import { TodoList } from '@/utils/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useTodoLists = (): UseQueryResult<TodoList[], ApiError> => {
  const api = useApi()

  return useQuery([QUERY_KEY.TODO, QUERY_KEY.TODO_LISTS], api.todo.list.getAll, {
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
  const api = useApi()

  return useQuery([QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, id], () => api.todo.list.getOne(id), {
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
