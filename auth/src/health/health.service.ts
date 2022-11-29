import { Injectable } from '@nestjs/common'
import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus'
import { AuthHealthIndicator } from './auth.health'
import { PrismaHealthIndicator } from './prisma.health'

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaHealthIndicator,
    private auth: AuthHealthIndicator,
  ) {}

  live(): Promise<HealthCheckResult> {
    return this.health.check([() => this.auth.isHealthy('auth')])
  }

  ready(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.auth.isHealthy('auth'),
      () => this.prisma.isHealthy('database'),
    ])
  }
}
