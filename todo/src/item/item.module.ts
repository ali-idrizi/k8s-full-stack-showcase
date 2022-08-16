import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { ItemController } from './item.controller'
import { ItemService } from './item.service'

@Module({
  imports: [PrismaModule.forRoot()],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
