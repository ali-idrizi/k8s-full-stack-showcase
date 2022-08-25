import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ReqUtil } from '../utils/req.util'

export const ReqHeader = createParamDecorator(
  (header: string, ctx: ExecutionContext): string | undefined => {
    return ReqUtil.getHeaderFromContext(ctx, header)
  },
)
