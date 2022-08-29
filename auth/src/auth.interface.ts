import { Environment } from './auth.constant'

export interface Tokens {
  jwt: string
  refreshToken: string
}

export interface AuthEnvironment {
  [Environment.JWT_EXPIRES_IN_SECONDS]: string
  [Environment.REFRESH_TOKEN_EXPIRES_IN_SECONDS]: string
  [Environment.JWT_SECRET]: string
}

export interface ValidateJwtRes {
  expired: boolean
  userId: string
}
