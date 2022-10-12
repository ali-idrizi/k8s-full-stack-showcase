import { TodoItem, TodoList } from './types'

export const updateListItems = (
  list: TodoList | undefined,
  callback: (items: TodoItem[]) => TodoItem[],
): TodoList | undefined => {
  if (list) {
    return {
      ...list,
      items: callback(list.items ?? []),
    }
  }

  return undefined
}
