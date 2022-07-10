import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from './prisma.service'

describe('Prisma', () => {
  let module: TestingModule
  let service: PrismaService

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile()

    service = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', async () => {
    expect(service).toBeDefined()
  })

  it('should connect', async () => {
    jest.spyOn(service, '$connect').mockResolvedValue()

    await module.init()
    expect(service.$connect).toHaveBeenCalled()
  })

  it('should disconnect', async () => {
    jest.spyOn(service, '$disconnect').mockResolvedValue()

    await module.close()
    expect(service.$disconnect).toHaveBeenCalled()
  })
})
