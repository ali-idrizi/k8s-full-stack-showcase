import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { catchError, Observable, throwError } from 'rxjs'

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        switch (true) {
          case error instanceof RpcException:
            return throwError(() => error)

          case error instanceof BadRequestException:
            const response = error.getResponse()

            return throwError(
              () =>
                new RpcException({
                  message: response?.message ?? 'An unknown error occurred',
                  error: response?.error ?? undefined,
                }),
            )

          default:
            console.error(error)
            return throwError(() => new RpcException('An unknown error occurred'))
        }
      }),
    )
  }
}
