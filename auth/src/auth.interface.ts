import * as JWT from 'jsonwebtoken'
import { Environment } from './auth.constant'

export interface TokenPair {
  jwt: string
  refreshToken: string
}

export interface AuthEnvironment {
  [Environment.JWT_EXPIRES_IN_SECONDS]: string
  [Environment.JWT_SECRET]: string
}

export interface ValidateJwtRes {
  expired: boolean
  payload: JWT.JwtPayload
}
