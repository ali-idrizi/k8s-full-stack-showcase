import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { PrismaModule } from 'src/prisma/prisma.module'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'

@Module({
  controllers: [LoginController],
  providers: [
    LoginService,
    {
      provide: 'AUTH_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ClientProxy => {
        const natsHost = configService.get('NATS_SERVICE_SERVICE_HOST', { infer: true })
        const natsPort = configService.get('NATS_SERVICE_SERVICE_PORT', { infer: true })

        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [`nats://${natsHost}:${natsPort}`],
          },
        })
      },
    },
  ],
  imports: [PrismaModule],
})
export class LoginModule {}
