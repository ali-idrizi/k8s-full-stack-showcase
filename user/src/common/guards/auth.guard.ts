import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Header } from 'src/auth/auth.constant'
import { ReqUtil } from '../utils/req.util'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const userId = ReqUtil.getHeaderFromContext(ctx, Header.UID)

    if (userId === undefined) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }

    return true
  }
}
