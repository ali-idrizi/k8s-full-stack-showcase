import { ENV } from './user.constant'

export interface Tokens {
  jwt: string
  refreshToken: string
}

export type Environment = {
  [key in keyof typeof ENV]: string
}
