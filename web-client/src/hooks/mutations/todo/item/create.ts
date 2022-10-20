import { ApiError } from '@/api'
import { CreateTodoItemPayload } from '@/api/todo/item'
import { useApi } from '@/hooks'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { updateListItems } from '@/utils/list'
import { TodoItem, TodoList } from '@/utils/types'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useCreateItemMutation = (): UseMutationResult<
  TodoItem,
  ApiError,
  CreateTodoItemPayload
> => {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation([MUTATION_KEY.TODO_ITEM.CREATE], api.todo.item.create, {
    onSuccess: async (newItem) => {
      queryClient.setQueryData<TodoList>(
        [QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, newItem.listId],
        (list) => updateListItems(list, (items) => [newItem, ...items]),
      )
    },
  })
}
