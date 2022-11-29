import { ApiError } from '@/api'
import { UpdateTodoItemPayload } from '@/api/todo/item'
import { useApi } from '@/hooks'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { updateListItems } from '@/utils/list'
import { TodoItem, TodoList } from '@/utils/types'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export const useUpdateItemMutation = (
  todo: TodoItem,
): UseMutationResult<TodoItem, ApiError, UpdateTodoItemPayload> => {
  const api = useApi()
  const queryClient = useQueryClient()

  const replaceTodo = useCallback(
    (newItem: TodoItem) => {
      queryClient.setQueryData<TodoList>(
        [QUERY_KEY.TODO, QUERY_KEY.TODO_LIST, todo.listId],
        (list) => {
          return updateListItems(list, (items) =>
            items.map((item) => (item.id === todo.id ? newItem : item)),
          )
        },
      )
    },
    [queryClient, todo],
  )

  return useMutation(
    [MUTATION_KEY.TODO_ITEM.UPDATE],
    (payload) => api.todo.item.update(todo.id, payload),
    {
      onMutate: (variables) => {
        replaceTodo({ ...todo, ...variables })

        return {
          originalTodo: todo,
        }
      },
      onError: (_error, _variables, context) => {
        if (context?.originalTodo) {
          replaceTodo(context?.originalTodo)
        }
      },
      onSuccess: replaceTodo,
    },
  )
}
