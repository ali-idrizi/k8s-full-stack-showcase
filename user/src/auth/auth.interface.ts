import { Environment } from './auth.constants'

export interface IAuthEnvironment {
  [Environment.NATS_HOST]: string
  [Environment.NATS_PORT]: string
}
