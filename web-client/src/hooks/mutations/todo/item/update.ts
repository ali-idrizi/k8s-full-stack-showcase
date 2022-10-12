import { API, ApiError } from '@/api'
import { UpdateTodoItemPayload } from '@/api/todo/item'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { TodoItem, TodoList } from '@/utils/types'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

const updateListItem = (list: TodoList | undefined, updatedItem: TodoItem) => {
  if (list) {
    return {
      ...list,
      items: list.items?.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    }
  }
  return undefined
}

export const useUpdateItemMutation = (
  id: string,
): UseMutationResult<TodoItem, ApiError, UpdateTodoItemPayload> => {
  const queryClient = useQueryClient()

  return useMutation(
    [MUTATION_KEY.TODO_ITEM.UPDATE],
    (payload) => API.todo.item.update(id, payload),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData<TodoList>(
          [QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, data.listId],
          (list) => updateListItem(list, data),
        )
      },
    },
  )
}
