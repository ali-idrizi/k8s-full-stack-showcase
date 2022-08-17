import { Controller, Get } from '@nestjs/common'
import { List } from '@prisma/client'
import { ListService } from './list.service'

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get('/')
  getAll(): Promise<List[]> {
    return this.listService.getAll()
  }
}
