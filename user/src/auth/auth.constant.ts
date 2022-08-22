export const Environment = {
  NATS_HOST: 'NATS_HOST',
  NATS_PORT: 'NATS_PORT',
} as const

export const Command = {
  GEN_TOKENS: 'genTokens',
  REMOVE_REFRESH_TOKEN: 'removeRefreshToken',
} as const
