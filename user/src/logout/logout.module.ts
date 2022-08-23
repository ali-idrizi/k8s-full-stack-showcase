import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { LogoutController } from './logout.controller'

@Module({
  controllers: [LogoutController],
  imports: [AuthModule],
})
export class LogoutModule {}
