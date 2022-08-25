import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common'
import { USER_ID_HEADER } from 'src/common/constants/auth.constants'
import { ReqUtil } from 'src/common/utils/req.util'

export const UserId = createParamDecorator((_: never, ctx: ExecutionContext): string => {
  const userId = ReqUtil.getHeaderFromContext(ctx, USER_ID_HEADER)

  if (!userId) {
    throw new InternalServerErrorException()
  }

  return userId
})
