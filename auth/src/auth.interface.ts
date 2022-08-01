export interface ITokenPair {
  readonly jwt: string
  readonly refreshToken: string
}

export interface IEnvironment {
  readonly JWT_EXPIRES_IN_SECONDS: string
  readonly JWT_SECRET: string
}
