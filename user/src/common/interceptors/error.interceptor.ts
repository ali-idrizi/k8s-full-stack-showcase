import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common'
import { catchError, Observable, throwError } from 'rxjs'

@Injectable()
export class ErrorIterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        switch (true) {
          case error instanceof HttpException:
            return throwError(() => error)

          default:
            // TODO: Log error and message
            return throwError(() => new InternalServerErrorException('Internal Server Error'))
        }
      }),
    )
  }
}
