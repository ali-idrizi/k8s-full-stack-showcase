import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { HealthModule } from './health/health.module'

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule.forRoot({ isGlobal: true }), HealthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
