import { Prisma } from '@prisma/client'

export const ErrorUtil = {
  isNotFoundError: (error: unknown): boolean => {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
  },
}
