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
      await listController.getAll()
      expect(prismaService.list.findMany).toHaveBeenCalled()
    })
  })

  describe('getOne', () => {
    it('should return a list with items', async () => {
      await listController.getOne('id')
      expect(prismaService.list.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 'id' },
        include: { items: true },
      })
    })

    it('should throw BadRequest if list does not exist', () => {
      prismaMockContext.prisma.list.findUniqueOrThrow.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          'List does not exist in the database',
          'P2025',
          '',
        ),
      )

      expect(async () => {
        await listController.getOne('id')
      }).rejects.toThrow(BadRequestException)
    })
  })

  describe('create', () => {
    it('should create a new list', async () => {
      await listController.create({ title: 'title' })
      expect(prismaService.list.create).toHaveBeenCalled()
    })
  })

  describe('delete', () => {
    it('should delete a list', async () => {
      await listController.delete('id')
      expect(prismaService.list.delete).toHaveBeenCalledWith({
        where: { id: 'id' },
      })
    })

    it('should throw BadRequest if list is not found', async () => {
      prismaMockContext.prisma.list.delete.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          'Item does not exist in the database',
          'P2025',
          '',
        ),
      )

      expect(async () => {
        await listController.delete('id')
      }).rejects.toThrow(BadRequestException)
    })
  })
})
