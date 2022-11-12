import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { Environment } from './auth.constant'
import { AuthModule } from './auth.module'
import { ErrorInterceptor } from './common/interceptors/error.interceptor'

const CONNECT_RETRIES = 10
const CONNECT_DELAY = 5000

const NATS_URL = process.env[Environment.NATS_URL]

async function bootstrap(): Promise<void> {
  if (!NATS_URL) {
    throw new Error('Nats environment variable missing')
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.NATS,
    options: {
      servers: [NATS_URL],
      reconnect: true,
      maxReconnectAttempts: CONNECT_RETRIES,
      reconnectTimeWait: CONNECT_DELAY,
    },
  })

  app
    .useGlobalPipes(new ValidationPipe({ transform: true, stopAtFirstError: true }))
    .useGlobalInterceptors(new ErrorInterceptor())

  await app.listen()
}
bootstrap()
