import { API, ApiError } from '@/api'
import { CreateTodoItemPayload } from '@/api/todo/item'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { TodoItem, TodoList } from '@/utils/types'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

const insertListItem = (list: TodoList | undefined, item: TodoItem) => {
  if (list) {
    return {
      ...list,
      items: [item, ...(list.items ?? [])],
    }
  }
  return undefined
}
export const useCreateItemMutation = (): UseMutationResult<
  TodoItem,
  ApiError,
  CreateTodoItemPayload
> => {
  const queryClient = useQueryClient()

  return useMutation([MUTATION_KEY.TODO_ITEM.CREATE], API.todo.item.create, {
    onSuccess: async (data) => {
      queryClient.setQueryData<TodoList>(
        [QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, data.listId],
        (list) => insertListItem(list, data),
      )
    },
  })
}
