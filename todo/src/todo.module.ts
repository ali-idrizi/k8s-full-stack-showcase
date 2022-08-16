import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { PrismaModule } from 'nestjs-prisma'
import { ItemModule } from './item/item.module'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ItemModule,
  ],
})
export class TodoModule {}
