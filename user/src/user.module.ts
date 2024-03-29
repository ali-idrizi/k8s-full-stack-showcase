import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { PrismaModule } from 'nestjs-prisma'
import { AuthModule } from './auth/auth.module'
import { HealthModule } from './health/health.module'
import { LoginModule } from './login/login.module'
import { LogoutModule } from './logout/logout.module'
import { RegisterModule } from './register/register.module'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    HealthModule,
    LoginModule,
    RegisterModule,
    LogoutModule,
  ],
})
export class UserModule {}
