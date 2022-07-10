import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class DurationLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    const url = context.switchToHttp().getRequest().url
    const now = performance.now()

    const logTime = (): void => {
      const executionTime = performance.now() - now
      console.log(`[${url}] Request took ${executionTime.toFixed(0)}ms`)
    }

    return next.handle().pipe(
      tap({
        next: logTime,
        error: logTime,
      }),
    )
  }
}
