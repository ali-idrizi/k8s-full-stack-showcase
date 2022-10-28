import { ApiError } from '@/api'
import { UpdateTodoItemPayload } from '@/api/todo/item'
import { useApi } from '@/hooks'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { updateListItems } from '@/utils/list'
import { TodoItem, TodoList } from '@/utils/types'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useUpdateItemMutation = (
  id: string,
): UseMutationResult<TodoItem, ApiError, UpdateTodoItemPayload> => {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation(
    [MUTATION_KEY.TODO_ITEM.UPDATE],
    (payload) => api.todo.item.update(id, payload),
    {
      onSuccess: async (updatedItem) => {
        queryClient.setQueryData<TodoList>(
          [QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, updatedItem.listId],
          (list) => {
            return updateListItems(list, (items) =>
              items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
            )
          },
        )
      },
    },
  )
}
