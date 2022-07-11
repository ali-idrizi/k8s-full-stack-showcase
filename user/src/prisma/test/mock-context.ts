import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

export type PrismaMockContext = {
  prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): PrismaMockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  }
}
