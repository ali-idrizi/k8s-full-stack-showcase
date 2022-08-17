import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common'
import { Item } from '@prisma/client'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'
import { ItemService } from './item.service'

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post('/')
  create(@Body() createDto: CreateDto): Promise<Item> {
    return this.itemService.create(createDto)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<void> {
    return this.itemService.delete(id)
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDto): Promise<Item> {
    return this.itemService.update(id, updateDto)
  }
}
