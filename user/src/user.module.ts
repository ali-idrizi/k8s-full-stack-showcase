import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
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
    LoginModule,
    RegisterModule,
    LogoutModule,
  ],
})
export class UserModule {}
