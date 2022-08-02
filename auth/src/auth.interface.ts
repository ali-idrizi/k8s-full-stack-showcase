import * as JWT from 'jsonwebtoken'

export interface TokenPair {
  readonly jwt: string
  readonly refreshToken: string
}

export interface IEnvironment {
  readonly JWT_EXPIRES_IN_SECONDS: string
  readonly JWT_SECRET: string
}

export interface ValidateJwtRes {
  expired: boolean
  payload: JWT.JwtPayload
}

export interface RemoveRefreshTokenRes {
  success: boolean
}
