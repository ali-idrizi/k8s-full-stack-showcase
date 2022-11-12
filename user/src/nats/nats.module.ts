import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { ConfigUtil } from 'src/common/utils/config.util'
import { ENV } from '../user.constants'
import { Environment } from '../user.interface'
import { NATS_CLIENT } from './nats.constants'

@Module({
  providers: [
    {
      provide: NATS_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Environment>): ClientProxy => {
        const natsUrl = ConfigUtil.getEnv(configService, ENV.NATS_URL)

        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [natsUrl],
          },
        })
      },
    },
  ],
  exports: [NATS_CLIENT],
})
export class NatsModule {}
