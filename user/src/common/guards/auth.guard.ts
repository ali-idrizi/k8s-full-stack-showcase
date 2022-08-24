import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { ReqUtil } from '../utils/req.util'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const userId = ReqUtil.getHeaderFromContext(ctx, 'X-User-ID')

    if (userId === undefined) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }

    return true
  }
}
