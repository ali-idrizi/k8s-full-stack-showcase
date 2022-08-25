import { BadRequestException, Injectable } from '@nestjs/common'
import { Item } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { ErrorUtil } from 'src/common/utils/error.util'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'
import { ItemNotFoundException } from './exceptions'

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createDto: CreateDto): Promise<Item> {
    try {
      const item = await this.prisma.item.create({
        data: {
          title: createDto.title,
          list: {
            connect: {
              userIndex: {
                userId,
                id: createDto.listId,
              },
            },
          },
        },
      })

      return item
    } catch (error) {
      if (ErrorUtil.isNotFoundError(error)) {
        throw new BadRequestException('List not found')
      }

      throw error
    }
  }

  async delete(userId: string, id: string): Promise<void> {
    try {
      const item = await this.prisma.item.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          list: true,
        },
      })

      if (item.list.userId !== userId) {
        throw new ItemNotFoundException()
      }

      await this.prisma.item.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      if (ErrorUtil.isNotFoundError(error)) {
        throw new ItemNotFoundException()
      }

      throw error
    }
  }

  async update(userId: string, id: string, updateDto: UpdateDto): Promise<Item> {
    try {
      const item = await this.prisma.item.update({
        where: {
          id,
        },
        include: {
          list: true,
        },
        data: updateDto,
      })

      if (item.list.userId !== userId) {
        throw new ItemNotFoundException()
      }

      return item
    } catch (error) {
      if (ErrorUtil.isNotFoundError(error)) {
        throw new ItemNotFoundException()
      }

      throw error
    }
  }
}
