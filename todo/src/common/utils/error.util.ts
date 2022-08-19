import { Prisma } from '@prisma/client'

export const ErrorUtil = {
  /**
   * Returns true if the error is a Prisma not found error
   *
   * @param error the error that was thrown
   *
   * @returns true if the error is a Prisma not found error (P2025)
   */
  isNotFoundError: (error: unknown): boolean => {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
  },
}
