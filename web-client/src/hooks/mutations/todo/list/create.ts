import { API, ApiError } from '@/api'
import { CreateTodoListPayload } from '@/api/todo/list'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { TodoList } from '@/utils/types'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useCreateListMutation = (): UseMutationResult<
  TodoList,
  ApiError,
  CreateTodoListPayload
> => {
  const queryClient = useQueryClient()

  return useMutation([MUTATION_KEY.TODO_LIST.CREATE], API.todo.list.create, {
    onSuccess: async (data) => {
      queryClient.setQueryData<TodoList[]>(
        [QUERY_KEY.TODO, QUERY_KEY.TODO_LISTS],
        (previousData) => [...(previousData ?? []), data],
      )
    },
  })
}
