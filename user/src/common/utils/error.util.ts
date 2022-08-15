import { Prisma } from '@prisma/client'

export const ErrorUtil = {
  /**
   * Check whether the error is a Prisma unique constraint failed error
   *
   * @param error the error that was thrown
   *
   * @returns true if the error is a Prisma unique constraint failed error (P2002)
   */
  isConstraintFailedError: (error: unknown): boolean => {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
  },
}
