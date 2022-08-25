import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { USER_ID_HEADER } from 'src/common/constants/auth.constants'
import { ReqUtil } from '../utils/req.util'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const userId = ReqUtil.getHeaderFromContext(ctx, USER_ID_HEADER)

    if (userId === undefined) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }

    return true
  }
}
