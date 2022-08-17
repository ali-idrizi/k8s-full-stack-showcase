import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Item, Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { createMockContext, PrismaMockContext } from 'src/common/test/prisma.mock-context'
import { ItemController } from './item.controller'
import { ItemService } from './item.service'

const TEST_ITEM: Item = {
  id: '1',
  title: 'Test Item',
  createdAt: new Date(),
  completed: false,
  listId: '1',
} as const

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
      prismaMockContext.prisma.item.create.mockResolvedValue({ ...TEST_ITEM })

      const res = await itemController.create({
        title: TEST_ITEM.title,
        listId: TEST_ITEM.listId,
      })

      expect(prismaService.item.create).toHaveBeenCalledTimes(1)
      expect(res).toEqual(TEST_ITEM)
    })

    it('should throw BadRequest if list is not found', async () => {
      prismaMockContext.prisma.item.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          'List does not exist in the database',
          'P2025',
          '',
        ),
      )

      expect(async () => {
        await itemController.create({
          title: TEST_ITEM.title,
          listId: TEST_ITEM.listId,
        })
      }).rejects.toThrow(BadRequestException)
    })
  })

  describe('delete', () => {
    it('should delete an item', async () => {
      prismaMockContext.prisma.item.delete.mockResolvedValue({ ...TEST_ITEM })

      await itemController.delete(TEST_ITEM.id)

      expect(prismaService.item.delete).toHaveBeenCalledWith({
        where: { id: TEST_ITEM.id },
      })
    })

    it('should throw BadRequest if item is not found', async () => {
      prismaMockContext.prisma.item.delete.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          'Item does not exist in the database',
          'P2025',
          '',
        ),
      )

      expect(async () => {
        await itemController.delete(TEST_ITEM.id)
      }).rejects.toThrow(BadRequestException)
    })
  })

  describe('update', () => {
    const updateData = { title: 'New Title' }

    it('should update an item', async () => {
      prismaMockContext.prisma.item.update.mockResolvedValueOnce({ ...TEST_ITEM, ...updateData })

      const res = await itemController.update(TEST_ITEM.id, updateData)

      expect(prismaService.item.update).toHaveBeenCalledWith({
        where: { id: TEST_ITEM.id },
        data: { title: updateData.title },
      })
      expect(res.title).toBe(updateData.title)
    })

    it('should throw BadRequest if item is not found', async () => {
      prismaMockContext.prisma.item.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          'Item does not exist in the database',
          'P2025',
          '',
        ),
      )

      expect(async () => {
        await itemController.update(TEST_ITEM.id, updateData)
      }).rejects.toThrow(BadRequestException)
    })
  })
})
