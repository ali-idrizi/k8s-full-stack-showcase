import { Environment } from './auth.constant'

export interface IAuthEnvironment {
  [Environment.NATS_HOST]: string
  [Environment.NATS_PORT]: string
}
