import { ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const ReqUtil = {
  getHeaderFromContext(ctx: ExecutionContext, header: string): string | undefined {
    const req: Request = ctx.switchToHttp().getRequest()
    return req.get(header)
  },
}
