import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { PrismaModule } from 'nestjs-prisma'
import { HealthModule } from './health/health.module'
import { ItemModule } from './item/item.module'
import { ListModule } from './list/list.module'

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
    HealthModule,
    ItemModule,
    ListModule,
  ],
})
export class TodoModule {}
