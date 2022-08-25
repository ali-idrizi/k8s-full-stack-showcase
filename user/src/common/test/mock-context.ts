import { ClientProxy } from '@nestjs/microservices'
import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>
  clientProxy: DeepMockProxy<ClientProxy>
  req: DeepMockProxy<Request>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
    clientProxy: mockDeep<ClientProxy>(),
    req: mockDeep<Request>(),
  }
}
