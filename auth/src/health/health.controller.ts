import { Controller, Get } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus'
import { COMMAND } from './health.constants'
import { HealthService } from './health.service'

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get('live')
  @HealthCheck()
  live(): Promise<HealthCheckResult> {
    return this.healthService.live()
  }

  @Get('ready')
  @HealthCheck()
  ready(): Promise<HealthCheckResult> {
    return this.healthService.ready()
  }

  @MessagePattern({ cmd: COMMAND.health })
  health(): boolean {
    return true
  }
}
