import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { IEnvironment } from './app.interface'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'

const ENV: IEnvironment = {}

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          ignoreEnvVars: true,
          load: [(): IEnvironment => ENV],
        }),
        PrismaModule,
      ],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('/', () => {
    it('should work', () => {
      expect(appController).toBeDefined()
    })
  })
})
