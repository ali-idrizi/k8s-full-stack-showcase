import { Environment } from './auth.constant'

export interface AuthEnvironment {
  [Environment.NATS_HOST]: string
  [Environment.NATS_PORT]: string
}
