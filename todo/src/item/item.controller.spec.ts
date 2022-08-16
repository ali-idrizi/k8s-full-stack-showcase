import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'nestjs-prisma'
import { createMockContext, PrismaMockContext } from 'src/common/test/prisma.mock-context'
import { ItemController } from './item.controller'
import { ItemService } from './item.service'

describe('ItemController', () => {
  let itemController: ItemController
  let prismaMockContext: PrismaMockContext

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
  })

  it('should be defined', () => {
    expect(itemController).toBeDefined()
  })
})
