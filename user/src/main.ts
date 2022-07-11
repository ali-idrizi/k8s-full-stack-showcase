import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import 'reflect-metadata'
import { DurationLoggerInterceptor } from './common/interceptors/duration-logger.interceptor'
import { ErrorIterceptor } from './common/interceptors/error.interceptor'
import { UserModule } from './user.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(UserModule)

  app
    .useGlobalPipes(new ValidationPipe({ transform: true, stopAtFirstError: true }))
    .useGlobalInterceptors(new DurationLoggerInterceptor(), new ErrorIterceptor())
    .use(cookieParser())

  await app.listen(3001)
}
bootstrap()
