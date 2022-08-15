import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [AuthModule],
})
export class LoginModule {}
