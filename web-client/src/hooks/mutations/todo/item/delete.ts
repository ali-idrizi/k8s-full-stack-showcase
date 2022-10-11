import { API, ApiError } from '@/api'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { TodoItem, TodoList } from '@/utils/types'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

const deleteListItem = (list: TodoList | undefined, deleteId: string) => {
  if (list) {
    return {
      ...list,
      items: list.items?.filter((item) => item.id !== deleteId),
    }
  }
  return undefined
}

export const useDeleteItemMutation = (id: string): UseMutationResult<TodoItem, ApiError> => {
  const queryClient = useQueryClient()

  return useMutation([MUTATION_KEY.TODO_ITEM_DELETE], () => API.todo.item.delete(id), {
    onSuccess: async (data) => {
      queryClient.setQueryData<TodoList>(
        [QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, data.listId],
        (list) => deleteListItem(list, data.id),
      )
    },
  })
}
