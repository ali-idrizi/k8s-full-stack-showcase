import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common'
import { Header } from 'src/auth/auth.constant'
import { ReqUtil } from '../utils/req.util'

export const UserId = createParamDecorator((_: never, ctx: ExecutionContext): string => {
  const userId = ReqUtil.getHeaderFromContext(ctx, Header.UID)

  if (!userId) {
    throw new InternalServerErrorException()
  }

  return userId
})
