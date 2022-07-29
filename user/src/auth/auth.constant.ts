export const Environment = {
  NATS_HOST: 'NATS_HOST',
  NATS_PORT: 'NATS_PORT',
} as const

export const Command = {
  GENERATE_TOKEN_PAIR: 'generateTokenPair',
  REMOVE_REFRESH_TOKEN: 'removeRefreshToken',
} as const
