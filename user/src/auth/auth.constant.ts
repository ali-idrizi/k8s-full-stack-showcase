export const Command = {
  GEN_TOKENS: 'genTokens',
  VALIDATE_JWT: 'validateJwt',
  REFRESH_JWT: 'refreshJwt',
  REMOVE_REFRESH_TOKEN: 'removeRefreshToken',
} as const

export const AUTH_CLIENT = Symbol('AUTH_CLIENT')
