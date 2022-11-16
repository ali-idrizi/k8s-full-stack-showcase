import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import * as cookieParser from 'cookie-parser'
import 'reflect-metadata'
import { DurationLoggerInterceptor } from './common/interceptors/duration-logger.interceptor'
import { ErrorIterceptor } from './common/interceptors/error.interceptor'
import { Environment } from './todo.constants'
import { TodoModule } from './todo.module'

const CONNECT_RETRIES = 10
const CONNECT_DELAY = 5000

const NATS_URL = process.env[Environment.NATS_URL]

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(TodoModule)

  if (!NATS_URL) {
    throw new Error('Nats environment variable missing')
  }

  app
    .useGlobalPipes(
      new ValidationPipe({ transform: true, stopAtFirstError: true, whitelist: true }),
    )
    .useGlobalInterceptors(new DurationLoggerInterceptor(), new ErrorIterceptor())
    .use(cookieParser())
    .connectMicroservice<MicroserviceOptions>({
      transport: Transport.NATS,
      options: {
        servers: [NATS_URL],
        reconnect: true,
        maxReconnectAttempts: CONNECT_RETRIES,
        reconnectTimeWait: CONNECT_DELAY,
      },
    })

  await app.startAllMicroservices()
  await app.listen(3002)
}
bootstrap()
