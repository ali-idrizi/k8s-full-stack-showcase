import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import 'reflect-metadata'
import { AppModule } from './app.module'
import { DurationLoggerInterceptor } from './common/interceptors/duration-logger.interceptor'
import { ErrorIterceptor } from './common/interceptors/error.interceptor'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.useGlobalInterceptors(new DurationLoggerInterceptor(), new ErrorIterceptor())
  await app.listen(3001)
}
bootstrap()
