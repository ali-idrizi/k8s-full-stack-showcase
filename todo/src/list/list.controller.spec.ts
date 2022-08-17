import { Test, TestingModule } from '@nestjs/testing'
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
})
