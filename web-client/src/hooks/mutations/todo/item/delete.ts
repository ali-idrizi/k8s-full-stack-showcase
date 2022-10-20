import { ApiError } from '@/api'
import { useApi } from '@/hooks'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { updateListItems } from '@/utils/list'
import { TodoItem, TodoList } from '@/utils/types'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useDeleteItemMutation = (id: string): UseMutationResult<TodoItem, ApiError> => {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation([MUTATION_KEY.TODO_ITEM.DELETE], () => api.todo.item.delete(id), {
    onSuccess: async (deletedItem) => {
      queryClient.setQueryData<TodoList>(
        [QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, deletedItem.listId],
        (list) =>
          updateListItems(list, (items) => items.filter((item) => item.id !== deletedItem.id)),
      )
    },
  })
}
