import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common'
import { catchError, Observable } from 'rxjs'

@Injectable()
export class ErrorIterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        switch (true) {
          case error instanceof HttpException:
            throw error

          default:
            // TODO: Log error and message
            throw new InternalServerErrorException('Internal Server Error')
        }
      }),
    )
  }
}
