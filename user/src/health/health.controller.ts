import { Controller, Get } from '@nestjs/common'
import { HealthCheck, HealthCheckResult, HealthCheckService } from '@nestjs/terminus'
import { PrismaHealthIndicator } from './prisma.health'

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private prisma: PrismaHealthIndicator) {}

  @Get('live')
  @HealthCheck()
  live(): Promise<HealthCheckResult> {
    return this.health.check([])
  }

  @Get('ready')
  @HealthCheck()
  ready(): Promise<HealthCheckResult> {
    return this.health.check([() => this.prisma.isHealthy('database')])
  }
}
