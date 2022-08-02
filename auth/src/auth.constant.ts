export const Environment = {
  JWT_EXPIRES_IN_SECONDS: 'JWT_EXPIRES_IN_SECONDS',
  JWT_SECRET: 'JWT_SECRET',
  NATS_HOST: 'NATS_HOST',
  NATS_PORT: 'NATS_PORT',
} as const

export const Command = {
  GENERATE_TOKEN_PAIR: 'generateTokenPair',
  VALIDATE_JWT: 'validateJwt',
  REFRESH_JWT: 'refreshJwt',
  REMOVE_REFRESH_TOKEN: 'removeRefreshToken',
} as const
