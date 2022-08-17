import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { createMockContext, PrismaMockContext } from 'src/common/test/prisma.mock-context'
import { ItemController } from './item.controller'
import { ItemService } from './item.service'

describe('ItemController', () => {
  let itemController: ItemController
  let prismaMockContext: PrismaMockContext
  let prismaService: PrismaService

  beforeEach(async () => {
    prismaMockContext = createMockContext()
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        ItemService,
        {
          provide: PrismaService,
          useValue: prismaMockContext.prisma,
        },
      ],
      imports: [],
    }).compile()

    itemController = app.get<ItemController>(ItemController)
    prismaService = app.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(itemController).toBeDefined()
  })

  describe('create', () => {
    it('should create an item', async () => {
      await itemController.create({
        title: 'Title',
        listId: 'list-id',
      })

      expect(prismaService.item.create).toHaveBeenCalledWith({
        data: {
          title: 'Title',
          list: {
            connect: {
              id: 'list-id',
            },
          },
        },
      })
    })

    it('should throw BadRequest if list is not found', async () => {
      prismaMockContext.prisma.item.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('', 'P2025', ''),
      )

      expect(async () => {
        await itemController.create({
          title: 'Title',
          listId: 'list-id',
        })
      }).rejects.toThrow(BadRequestException)
    })
  })

  describe('delete', () => {
    it('should delete the item', async () => {
      await itemController.delete('id')

      expect(prismaService.item.delete).toHaveBeenCalledWith({
        where: { id: 'id' },
      })
    })

    it('should throw BadRequest if item is not found', async () => {
      prismaMockContext.prisma.item.delete.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('', 'P2025', ''),
      )

      expect(async () => {
        await itemController.delete('id')
      }).rejects.toThrow(BadRequestException)
    })
  })

  describe('update', () => {
    const updateData = { title: 'New Title' }

    it('should update the item', async () => {
      await itemController.update('id', updateData)

      expect(prismaService.item.update).toHaveBeenCalledWith({
        where: { id: 'id' },
        data: updateData,
      })
    })

    it('should throw BadRequest if item is not found', async () => {
      prismaMockContext.prisma.item.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('', 'P2025', ''),
      )

      expect(async () => {
        await itemController.update('id', updateData)
      }).rejects.toThrow(BadRequestException)
    })
  })
})
