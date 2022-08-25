import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { List } from '@prisma/client'
import { UserId } from 'src/common/decorators/user-id.decorator'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'
import { ListService } from './list.service'

@Controller('list')
@UseGuards(AuthGuard)
export class ListController {
  constructor(private listService: ListService) {}

  @Get('/')
  getAll(@UserId() userId: string): Promise<List[]> {
    return this.listService.getAll(userId)
  }

  @Get('/:id')
  getOne(@UserId() userId: string, @Param('id') id: string): Promise<List> {
    return this.listService.getOne(userId, id)
  }

  @Post('/')
  create(@UserId() userId: string, @Body() createDto: CreateDto): Promise<List> {
    return this.listService.create(userId, createDto)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@UserId() userId: string, @Param('id') id: string): Promise<void> {
    return this.listService.delete(userId, id)
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDto): Promise<List> {
    return this.listService.update(id, updateDto)
  }
}
