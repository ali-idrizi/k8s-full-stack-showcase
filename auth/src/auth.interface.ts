export interface ITokenPair {
  readonly jwt: string
  readonly refreshToken: string
}

export interface IGenerateTokenPairBody {
  readonly userId: string
}

export interface IEnvironment {
  readonly JWT_EXPIRES_IN_SECONDS: number
  readonly JWT_SECRET: string
}
