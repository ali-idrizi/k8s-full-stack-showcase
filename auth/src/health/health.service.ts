import { Injectable } from '@nestjs/common'
import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus'
import { NatsHealthIndicator } from './nats.health'
import { PrismaHealthIndicator } from './prisma.health'

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaHealthIndicator,
    private nats: NatsHealthIndicator,
  ) {}

  live(): Promise<HealthCheckResult> {
    return this.health.check([() => this.nats.isHealthy('nats')])
  }

  ready(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.nats.isHealthy('nats'),
      () => this.prisma.isHealthy('database'),
    ])
  }
}
