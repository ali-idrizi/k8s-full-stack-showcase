import { Injectable } from '@nestjs/common'
import { List } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<List[]> {
    return this.prisma.list.findMany({
      where: {
        // TODO: add userId clause
      },
    })
  }
}
