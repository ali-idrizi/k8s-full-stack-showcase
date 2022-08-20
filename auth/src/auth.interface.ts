import * as JWT from 'jsonwebtoken'
import { Environment } from './auth.constant'

export interface TokenPair {
  jwt: string
  refreshToken: string
}

export interface AuthEnvironment {
  [Environment.JWT_EXPIRES_IN_SECONDS]: string
  [Environment.REFRESH_TOKEN_EXPIRES_IN_SECONDS]: string
  [Environment.JWT_SECRET]: string
  [Environment.JWT_COOKIE_NAME]: string
  [Environment.REFRESH_TOKEN_COOKIE_NAME]: string
}

export interface ValidateJwtRes {
  expired: boolean
  payload: JWT.JwtPayload
}
