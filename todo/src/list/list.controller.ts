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
import { MessagePattern, Payload } from '@nestjs/microservices'
import { List } from '@prisma/client'
import { UserId } from 'src/common/decorators/user-id.decorator'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { COMMAND } from 'src/todo.constants'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'
import { UserCreatedDto } from './dto/user-created.dto'
import { ListService } from './list.service'

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getAll(@UserId() userId: string): Promise<List[]> {
    return this.listService.getAll(userId)
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  getOne(@UserId() userId: string, @Param('id') id: string): Promise<List> {
    return this.listService.getOne(userId, id)
  }

  @Post('/')
  @UseGuards(AuthGuard)
  create(@UserId() userId: string, @Body() createDto: CreateDto): Promise<List> {
    return this.listService.create(userId, createDto)
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@UserId() userId: string, @Param('id') id: string): Promise<void> {
    return this.listService.delete(userId, id)
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  update(
    @UserId() userId: string,
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<List> {
    return this.listService.update(userId, id, updateDto)
  }

  @MessagePattern({ cmd: COMMAND.userCreated })
  async handleUserCreated(@Payload() payload: UserCreatedDto): Promise<void> {
    await this.listService.create(payload.userId, {
      title: 'Todos',
    })
  }
}
