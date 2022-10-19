import { ApiError } from '@/api'
import { UpdateTodoListPayload } from '@/api/todo/list'
import { useApi } from '@/hooks'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { TodoList } from '@/utils/types'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useUpdateListMutation = (
  id: string,
): UseMutationResult<TodoList, ApiError, UpdateTodoListPayload> => {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation(
    [MUTATION_KEY.TODO_LIST.UPDATE],
    (payload) => api.todo.list.update(id, payload),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData<TodoList>(
          [QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, id],
          (previousList) => ({ ...previousList, ...data }),
        )

        queryClient.setQueryData<TodoList[]>([QUERY_KEY.TODO, QUERY_KEY.TODO_LISTS], (lists) => {
          return lists?.map((list) => {
            if (list.id === data.id) {
              return data
            }
            return list
          })
        })
      },
    },
  )
}
