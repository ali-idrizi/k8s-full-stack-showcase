import { API, ApiError } from '@/api'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { TodoList } from '@/utils/types'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useDeleteListMutation = (id: string): UseMutationResult<unknown, ApiError> => {
  const queryClient = useQueryClient()

  return useMutation([MUTATION_KEY.TODO_LIST.DELETE], () => API.todo.list.delete(id), {
    onSuccess: () => {
      queryClient.setQueryData<TodoList[]>([QUERY_KEY.TODO, QUERY_KEY.TODO_LISTS], (previousData) =>
        previousData?.filter((list) => list.id !== id),
      )
    },
  })
}
