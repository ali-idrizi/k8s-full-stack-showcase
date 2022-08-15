import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { RegisterController } from './register.controller'
import { RegisterService } from './register.service'

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
  imports: [AuthModule],
})
export class RegisterModule {}
