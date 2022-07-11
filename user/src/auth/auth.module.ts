import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { Environment } from './auth.constant'
import { AuthEnvironment } from './auth.interface'
import { AuthService } from './auth.service'

@Module({
  providers: [
    AuthService,
    {
      provide: 'AUTH_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AuthEnvironment>): ClientProxy => {
        const natsHost = configService.get(Environment.NATS_HOST, { infer: true })
        const natsPort = configService.get(Environment.NATS_PORT, { infer: true })

        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [`nats://${natsHost}:${natsPort}`],
          },
        })
      },
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
