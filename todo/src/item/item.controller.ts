import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
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
  create(@Body() createDto: CreateDto): Promise<Item> {
    return this.itemService.create(createDto)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<void> {
    return this.itemService.delete(id)
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
