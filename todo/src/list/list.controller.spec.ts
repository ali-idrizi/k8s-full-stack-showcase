import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { createMockContext, PrismaMockContext } from 'src/common/test/prisma.mock-context'
import { ListController } from './list.controller'
import { ListService } from './list.service'

describe('ListController', () => {
  let listController: ListController
  let prismaMockContext: PrismaMockContext
  let prismaService: PrismaService

  beforeEach(async () => {
    prismaMockContext = createMockContext()
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ListController],
      providers: [
        ListService,
        {
          provide: PrismaService,
          useValue: prismaMockContext.prisma,
        },
      ],
      imports: [],
    }).compile()

    listController = app.get<ListController>(ListController)
    prismaService = app.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(listController).toBeDefined()
  })

  describe('getAll', () => {
    it('should return all lists', async () => {
      await listController.getAll('test-user-id')
      expect(prismaService.list.findMany).toHaveBeenCalledWith({
        where: {
          userId: 'test-user-id',
        },
      })
    })
  })

  describe('getOne', () => {
    it('should return the list with items', async () => {
      await listController.getOne('test-user-id', 'id')
      expect(prismaService.list.findUniqueOrThrow).toHaveBeenCalledWith({
        where: {
          userIndex: { userId: 'test-user-id', id: 'id' },
        },
        include: {
          items: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      })
    })

    it('should throw BadRequest if list is not found', () => {
      prismaMockContext.prisma.list.findUniqueOrThrow.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('', 'P2025', ''),
      )

      expect(async () => {
        await listController.getOne('test-user-id', 'id')
      }).rejects.toThrow(BadRequestException)
    })
  })

  describe('create', () => {
    it('should create a new list', async () => {
      await listController.create('test-user-id', { title: 'title' })
      expect(prismaService.list.create).toHaveBeenCalledWith({
        data: { userId: 'test-user-id', title: 'title' },
      })
    })
  })

  describe('delete', () => {
    it('should delete the list', async () => {
      await listController.delete('test-user-id', 'id')
      expect(prismaService.list.delete).toHaveBeenCalledWith({
        where: {
          userIndex: { userId: 'test-user-id', id: 'id' },
        },
      })
    })

    it('should throw BadRequest if list is not found', async () => {
      prismaMockContext.prisma.list.delete.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('', 'P2025', ''),
      )

      expect(async () => {
        await listController.delete('test-user-id', 'id')
      }).rejects.toThrow(BadRequestException)
    })
  })

  describe('update', () => {
    const updateData = { title: 'New Title' }

    it('should update the list', async () => {
      await listController.update('test-user-id', 'id', updateData)

      expect(prismaService.list.update).toHaveBeenCalledWith({
        where: {
          userIndex: { userId: 'test-user-id', id: 'id' },
        },
        include: { items: true },
        data: updateData,
      })
    })

    it('should throw BadRequest if list is not found', async () => {
      prismaMockContext.prisma.list.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('', 'P2025', ''),
      )

      expect(async () => {
        await listController.update('test-user-id', 'id', updateData)
      }).rejects.toThrow(BadRequestException)
    })
  })
})
