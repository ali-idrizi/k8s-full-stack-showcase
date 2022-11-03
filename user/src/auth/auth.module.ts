import { Module } from '@nestjs/common'
import { NatsModule } from 'src/nats/nats.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [NatsModule],
})
export class AuthModule {}
