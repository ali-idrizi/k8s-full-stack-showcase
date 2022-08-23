export const Command = {
  GEN_TOKENS: 'genTokens',
  REMOVE_REFRESH_TOKEN: 'removeRefreshToken',
} as const

export const AUTH_CLIENT = Symbol('AUTH_CLIENT')
