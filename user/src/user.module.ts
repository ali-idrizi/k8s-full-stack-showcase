import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoginModule } from './login/login.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoginModule,
  ],
})
export class UserModule {}
