import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AuthModule } from './auth.module'

const CONNECT_RETRIES = 10
const CONNECT_DELAY = 5000

const NATS_HOST = process.env.NATS_HOST
const NATS_PORT = process.env.NATS_PORT

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.NATS,
    options: {
      servers: [`nats://${NATS_HOST}:${NATS_PORT}`],
      reconnect: true,
      maxReconnectAttempts: CONNECT_RETRIES,
      reconnectTimeWait: CONNECT_DELAY,
    },
  })

  await app.listen()
}
bootstrap()
