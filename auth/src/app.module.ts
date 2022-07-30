import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
