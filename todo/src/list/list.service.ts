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
