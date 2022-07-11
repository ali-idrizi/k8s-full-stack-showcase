export interface IEnvironment {
  NATS_SERVICE_SERVICE_HOST: string
  NATS_SERVICE_SERVICE_PORT: string
}

export interface ITokenPair {
  readonly jwt: string
  readonly refreshToken: string
}
