import { BadRequestException, Injectable } from '@nestjs/common'
import { List } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { ErrorUtil } from 'src/common/utils/error.util'
import { CreateDto } from './dto/create.dto'

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

  async create(createDto: CreateDto): Promise<List> {
    return this.prisma.list.create({
      data: {
        ...createDto,
        userId: 'temp-user-id', // TODO: update
      },
    })
  }

  async delete(id: string): Promise<void> {
    // TODO: Make sure item belongs to the user
    try {
      await this.prisma.list.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      if (ErrorUtil.isNotFoundError(error)) {
        throw new BadRequestException('List not found')
      }

      throw error
    }
  }
}
