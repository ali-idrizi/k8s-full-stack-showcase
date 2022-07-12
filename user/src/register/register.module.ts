import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { RegisterController } from './register.controller'
import { RegisterService } from './register.service'

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
  imports: [PrismaModule, AuthModule],
})
export class RegisterModule {}
