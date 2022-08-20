import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import * as cookieParser from 'cookie-parser'
import { Environment } from './auth.constant'
import { AuthModule } from './auth.module'
import { ErrorInterceptor } from './common/interceptors/error.interceptor'

const CONNECT_RETRIES = 10
const CONNECT_DELAY = 5000

const NATS_HOST = process.env[Environment.NATS_HOST]
const NATS_PORT = process.env[Environment.NATS_PORT]

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AuthModule)

  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: [`nats://${NATS_HOST}:${NATS_PORT}`],
      reconnect: true,
      maxReconnectAttempts: CONNECT_RETRIES,
      reconnectTimeWait: CONNECT_DELAY,
    },
  })

  app
    .useGlobalPipes(new ValidationPipe({ transform: true, stopAtFirstError: true }))
    .useGlobalInterceptors(new ErrorInterceptor())
    .use(cookieParser())

  await app.startAllMicroservices()
  await app.listen(3000)
}
bootstrap()
