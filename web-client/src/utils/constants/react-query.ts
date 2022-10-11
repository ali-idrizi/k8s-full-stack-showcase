export const QUERY_KEY = {
  AUTH: 'auth',
  TODO: 'todo',
  TODO_LISTS: 'todo-lists',
  TODO_LIST: 'todo-list',
} as const

export const MUTATION_KEY = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  REFRESH_TOKEN: 'refresh-token',
  REGISTER: 'register',
  TODO_LIST_CREATE: 'todo-list-create',
  TODO_LIST_UPDATE: 'todo-list-update',
  TODO_LIST_DELETE: 'todo-list-delete',
  TODO_ITEM_CREATE: 'todo-item-create',
  TODO_ITEM_UPDATE: 'todo-item-update',
  TODO_ITEM_DELETE: 'todo-item-delete',
}
