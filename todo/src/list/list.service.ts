import { BadRequestException, Injectable } from '@nestjs/common'
import { List } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { ErrorUtil } from 'src/common/utils/error.util'

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

  async getOne(id: string): Promise<List> {
    try {
      const list = await this.prisma.list.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          items: true,
        },
      })

      return list
    } catch (error) {
      if (ErrorUtil.isNotFoundError(error)) {
        throw new BadRequestException('List not found')
      }

      throw error
    }
  }
}
