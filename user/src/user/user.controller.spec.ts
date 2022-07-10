import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'
import { IEnvironment } from 'src/app.interface'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

const ENV: IEnvironment = {}

describe('UserController', () => {
  let userController: UserController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        PrismaModule,
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          ignoreEnvVars: true,
          load: [(): IEnvironment => ENV],
        }),
        ClientsModule.register([
          {
            name: 'AUTH_SERVICE',
            transport: Transport.NATS,
          },
        ]),
      ],
    }).compile()

    userController = app.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
  })

  describe('/login', () => {
    it('should be defined', () => {
      expect(userController).toBeDefined()
    })
  })
})
