import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { ENV } from '../user.constants'
import { Environment } from '../user.interface'
import { NATS_CLIENT } from './nats.constants'

@Module({
  providers: [
    {
      provide: NATS_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Environment>): ClientProxy => {
        const natsHost = configService.get(ENV.NATS_HOST, { infer: true })
        const natsPort = configService.get(ENV.NATS_PORT, { infer: true })

        if (!natsHost || !natsPort) {
          throw new Error('Nats environment variables missing')
        }

        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [`nats://${natsHost}:${natsPort}`],
          },
        })
      },
    },
  ],
  exports: [NATS_CLIENT],
})
export class NatsModule {}
