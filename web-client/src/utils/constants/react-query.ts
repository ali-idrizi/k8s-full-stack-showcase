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
  TODO_LIST: {
    CREATE: 'todo-list-create',
    UPDATE: 'todo-list-update',
    DELETE: 'todo-list-delete',
  },
  TODO_ITEM: {
    CREATE: 'todo-item-create',
    UPDATE: 'todo-item-update',
    DELETE: 'todo-item-delete',
  },
}
