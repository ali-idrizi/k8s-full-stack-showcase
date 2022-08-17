import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common'
import { List } from '@prisma/client'
import { CreateDto } from './dto/create.dto'
import { ListService } from './list.service'

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get('/')
  getAll(): Promise<List[]> {
    return this.listService.getAll()
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<List> {
    return this.listService.getOne(id)
  }

  @Post('/')
  create(@Body() createDto: CreateDto): Promise<List> {
    return this.listService.create(createDto)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<void> {
    return this.listService.delete(id)
  }
}
