import { Module } from '@nestjs/common'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { TerminusModule } from '@nestjs/terminus'
import { NatsHealthIndicator } from './nats.health'
import { HEALTH_NATS_CLIENT } from './health.constants'
import { HealthController } from './health.controller'
import { HealthService } from './health.service'
import { PrismaHealthIndicator } from './prisma.health'

@Module({
  imports: [TerminusModule],
  providers: [
    {
      provide: HEALTH_NATS_CLIENT,
      useFactory: (): ClientProxy => {
        const NATS_URL = process.env['NATS_URL']

        if (!NATS_URL) {
          throw new Error('Nats environment variable missing')
        }

        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [NATS_URL],
          },
        })
      },
    },
    PrismaHealthIndicator,
    NatsHealthIndicator,
    HealthService,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
