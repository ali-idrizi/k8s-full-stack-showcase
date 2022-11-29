import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus'
import { firstValueFrom, timeout } from 'rxjs'
import { COMMAND, HEALTH_NATS_CLIENT } from './health.constants'

@Injectable()
export class NatsHealthIndicator extends HealthIndicator {
  constructor(@Inject(HEALTH_NATS_CLIENT) private natsClient: ClientProxy) {
    super()
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const res = this.natsClient.send<boolean>({ cmd: COMMAND.health }, {}).pipe(timeout(1000))

    try {
      await firstValueFrom(res)
      return this.getStatus(key, true)
    } catch (e) {
      throw new HealthCheckError('Auth check failed', null)
    }
  }
}
