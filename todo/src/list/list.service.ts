import { BadRequestException, Injectable } from '@nestjs/common'
import { List } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { ErrorUtil } from 'src/common/utils/error.util'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  getAll(userId: string): Promise<List[]> {
    return this.prisma.list.findMany({
      where: {
        userId,
      },
    })
  }

  async getOne(userId: string, id: string): Promise<List> {
    try {
      const list = await this.prisma.list.findFirstOrThrow({
        where: {
          userId,
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

  async create(userId: string, createDto: CreateDto): Promise<List> {
    return this.prisma.list.create({
      data: {
        ...createDto,
        userId,
      },
    })
  }

  async delete(userId: string, id: string): Promise<void> {
    const { count } = await this.prisma.list.deleteMany({
      where: {
        userId,
        id,
      },
    })

    if (count === 0) {
      throw new BadRequestException('List not found')
    }
  }

  async update(id: string, updateDto: UpdateDto): Promise<List> {
    try {
      const list = await this.prisma.list.update({
        where: { id },
        data: updateDto,
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
