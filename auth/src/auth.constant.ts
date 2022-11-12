export const Environment = {
  JWT_EXPIRES_IN_SECONDS: 'JWT_EXPIRES_IN_SECONDS',
  REFRESH_TOKEN_EXPIRES_IN_SECONDS: 'REFRESH_TOKEN_EXPIRES_IN_SECONDS',
  JWT_SECRET: 'JWT_SECRET',
  NATS_URL: 'NATS_URL',
} as const

export const COMMAND = {
  genTokens: 'auth:genTokens',
  validateJwt: 'auth:validateJwt',
  refreshJwt: 'auth:refreshJwt',
  removeRefreshToken: 'auth:removeRefreshToken',
} as const
