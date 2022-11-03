import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { NatsModule } from 'src/nats/nats.module'
import { RegisterController } from './register.controller'
import { RegisterService } from './register.service'

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
  imports: [AuthModule, NatsModule],
})
export class RegisterModule {}
