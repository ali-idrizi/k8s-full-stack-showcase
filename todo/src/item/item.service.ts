import { BadRequestException, Injectable } from '@nestjs/common'
import { Item } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { ErrorUtil } from 'src/common/utils/error.util'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateDto): Promise<Item> {
    // TODO: Make sure listId belongs to the user
    try {
      const item = await this.prisma.item.create({
        data: {
          title: createDto.title,
          list: {
            connect: {
              id: createDto.listId,
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

  async delete(id: string): Promise<void> {
    // TODO: Make sure item belongs to the user
    try {
      await this.prisma.item.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      if (ErrorUtil.isNotFoundError(error)) {
        throw new BadRequestException('Item not found')
      }

      throw error
    }
  }

  async update(id: string, updateDto: UpdateDto): Promise<Item> {
    try {
      const item = await this.prisma.item.update({
        where: { id },
        data: updateDto,
      })

      return item
    } catch (error) {
      if (ErrorUtil.isNotFoundError(error)) {
        throw new BadRequestException('Item not found')
      }

      throw error
    }
  }
}
