import { InternalServerErrorException, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { ENV } from 'src/user.constants'
import { Environment } from 'src/user.interface'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AUTH_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Environment>): ClientProxy => {
        const natsHost = configService.get(ENV.NATS_HOST, { infer: true })
        const natsPort = configService.get(ENV.NATS_PORT, { infer: true })

        if (!natsHost || !natsPort) {
          throw new InternalServerErrorException()
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
  exports: [AuthService],
})
export class AuthModule {}
