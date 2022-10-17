import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { Item } from '@prisma/client'
import { UserId } from 'src/common/decorators/user-id.decorator'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'
import { ItemService } from './item.service'

@Controller('item')
@UseGuards(AuthGuard)
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post('/')
  create(@UserId() userId: string, @Body() createDto: CreateDto): Promise<Item> {
    return this.itemService.create(userId, createDto)
  }

  @Delete('/:id')
  delete(@UserId() userId: string, @Param('id') id: string): Promise<Item> {
    return this.itemService.delete(userId, id)
  }

  @Patch('/:id')
  update(
    @UserId() userId: string,
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<Item> {
    return this.itemService.update(userId, id, updateDto)
  }
}
