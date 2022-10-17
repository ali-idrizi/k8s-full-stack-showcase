import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Item, List, Prisma } from '@prisma/client'
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
      await itemController.create('test-user-id', {
        title: 'Title',
        listId: 'list-id',
      })

      expect(prismaService.item.create).toHaveBeenCalledWith({
        data: {
          title: 'Title',
          list: {
            connect: {
              userIndex: {
                id: 'list-id',
                userId: 'test-user-id',
              },
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
        await itemController.create('test-user-id', {
          title: 'Title',
          listId: 'list-id',
        })
      }).rejects.toThrow(BadRequestException)
    })
  })

  describe('delete', () => {
    it('should delete the item', async () => {
      prismaMockContext.prisma.item.findUniqueOrThrow.mockResolvedValue({
        list: {
          userId: 'test-user-id',
        },
      } as Item & { list: List })

      await itemController.delete('test-user-id', 'id')

      expect(prismaService.item.delete).toHaveBeenCalledWith({
        where: { id: 'id' },
      })
    })

    it('should throw BadRequest if item does not belong to user', async () => {
      prismaMockContext.prisma.item.findUniqueOrThrow.mockResolvedValue({
        list: {
          userId: 'another-user-id',
        },
      } as Item & { list: List })

      expect(async () => {
        await itemController.delete('test-user-id', 'id')
      }).rejects.toThrow(BadRequestException)
    })

    it('should throw BadRequest if item is not found', async () => {
      prismaMockContext.prisma.item.findUniqueOrThrow.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('', 'P2025', ''),
      )

      expect(async () => {
        await itemController.delete('test-user-id', 'id')
      }).rejects.toThrow(BadRequestException)
    })
  })

  describe('update', () => {
    const updateData = { title: 'New Title' }

    it('should update the item', async () => {
      prismaMockContext.prisma.item.findUniqueOrThrow.mockResolvedValue({
        list: {
          userId: 'test-user-id',
        },
      } as unknown as Item)
      prismaMockContext.prisma.item.update.mockResolvedValue({} as Item)

      await itemController.update('test-user-id', 'id', updateData)

      expect(prismaService.item.update).toHaveBeenCalledWith({
        where: { id: 'id' },
        data: updateData,
      })
    })

    it('should throw BadRequest if item does not belong to user', async () => {
      prismaMockContext.prisma.item.findUniqueOrThrow.mockResolvedValue({
        list: {
          userId: 'another-user-id',
        },
      } as unknown as Item)
      prismaMockContext.prisma.item.update.mockResolvedValue({} as Item)

      expect(async () => {
        await itemController.update('test-user-id', 'id', updateData)
      }).rejects.toThrow(BadRequestException)
    })

    it('should throw BadRequest if item is not found', async () => {
      prismaMockContext.prisma.item.findUniqueOrThrow.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('', 'P2025', ''),
      )

      expect(async () => {
        await itemController.update('test-user-id', 'id', updateData)
      }).rejects.toThrow(BadRequestException)
    })
  })
})
