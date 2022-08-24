import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common'
import { ReqUtil } from '../utils/req.util'

export const UserId = createParamDecorator((_: never, ctx: ExecutionContext): string => {
  const userId = ReqUtil.getHeaderFromContext(ctx, 'X-User-ID')
  if (!userId) {
    throw new InternalServerErrorException()
  }
  return userId
})
