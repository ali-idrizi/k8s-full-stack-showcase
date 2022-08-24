import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const ReqHeader = createParamDecorator(
  (header: string, ctx: ExecutionContext): string | undefined => {
    const req: Request = ctx.switchToHttp().getRequest()
    return req.get(header)
  },
)
