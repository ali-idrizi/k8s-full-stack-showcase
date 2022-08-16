import { Body, Controller, Post } from '@nestjs/common'
import { Item } from '@prisma/client'
import { CreateDto } from './dto/create.dto'
import { ItemService } from './item.service'

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post('/')
  create(@Body() createDto: CreateDto): Promise<Item> {
    return this.itemService.create(createDto)
  }
}
