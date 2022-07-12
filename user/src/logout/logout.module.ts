import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { LogoutController } from './logout.controller'
import { LogoutService } from './logout.service'

@Module({
  controllers: [LogoutController],
  providers: [LogoutService],
  imports: [AuthModule],
})
export class LogoutModule {}
