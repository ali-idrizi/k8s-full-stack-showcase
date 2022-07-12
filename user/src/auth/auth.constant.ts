export const Environment = {
  NATS_HOST: 'NATS_SERVICE_SERVICE_HOST',
  NATS_PORT: 'NATS_SERVICE_SERVICE_PORT',
} as const

export const Command = {
  GENERATE_TOKEN_PAIR: 'generateTokenPair',
  REMOVE_REFRESH_TOKEN: 'removeRefreshToken',
} as const
