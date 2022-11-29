import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { Environment } from './auth.constant'
import { AuthModule } from './auth.module'
import { DurationLoggerInterceptor } from './common/interceptors/duration-logger.interceptor'
import { ErrorInterceptor } from './common/interceptors/error.interceptor'

const NATS_URL = process.env[Environment.NATS_URL]

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AuthModule)

  if (!NATS_URL) {
    throw new Error('Nats environment variable missing')
  }

  app
    .useGlobalPipes(new ValidationPipe({ transform: true, stopAtFirstError: true }))
    .useGlobalInterceptors(new DurationLoggerInterceptor(), new ErrorInterceptor())
    .connectMicroservice({
      transport: Transport.NATS,
      options: {
        servers: [NATS_URL],
      },
    })

  await app.startAllMicroservices()
  await app.listen(3000)
}
bootstrap()
