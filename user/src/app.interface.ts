export interface ITokenPair {
  readonly jwt: string
  readonly refreshToken: string
}

export interface IEnvironment {
  [key: string]: unknown
}
