import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ServiceUnavailableException,
} from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { catchError, Observable, throwError } from 'rxjs'

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    return next.handle().pipe(
      catchError((error: unknown) => {
        if (error instanceof RpcException || error instanceof ServiceUnavailableException) {
          return throwError(() => error)
        }

        if (error instanceof BadRequestException) {
          let response = error.getResponse() as Record<string, unknown> | string

          if (typeof response !== 'string') {
            response = {
              status: 'error',
              message: response.message ?? 'An unknown error occurred',
              error: response.error ?? undefined,
            }
          }

          console.error(response)
          return throwError(() => new RpcException(response))
        }

        console.error(error)
        return throwError(() => new RpcException('An unknown error occurred'))
      }),
    )
  }
}
