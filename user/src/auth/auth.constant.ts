export const Environment = {
  NATS_HOST: 'NATS_PORT_4222_TCP_ADDR',
  NATS_PORT: 'NATS_PORT_4222_TCP_PORT',
} as const

export const Command = {
  GENERATE_TOKEN_PAIR: 'generateTokenPair',
  REMOVE_REFRESH_TOKEN: 'removeRefreshToken',
} as const
