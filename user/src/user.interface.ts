import { ENV } from './user.constants'

export interface Tokens {
  jwt: string
  refreshToken: string
}

export type Environment = {
  [key in keyof typeof ENV]: string
}
