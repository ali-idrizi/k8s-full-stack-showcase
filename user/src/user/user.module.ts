import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

const NATS_HOST = process.env.NATS_SERVICE_SERVICE_HOST
const NATS_PORT = process.env.NATS_SERVICE_SERVICE_PORT

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [`nats://${NATS_HOST}:${NATS_PORT}`],
        },
      },
    ]),
  ],
})
export class UserModule {}
