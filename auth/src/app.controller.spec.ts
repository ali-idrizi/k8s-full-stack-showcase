import { getMockRes } from '@jest-mock/express'
import { ConfigModule } from '@nestjs/config'
import { RpcException } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'
import * as JWT from 'jsonwebtoken'
import { AppController } from './app.controller'
import { IEnvironment, ITokenPair } from './app.interface'
import { AppService } from './app.service'

const USER_ID = 'random-user-uuid'
const ENV: IEnvironment = {
  JWT_EXPIRES_IN_SECONDS: 900,
  JWT_SECRET: 'secret',
}

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
      ],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('/generate', () => {
    const mockRes = getMockRes()
    let tokens: ITokenPair
    let timestamp: number

    it('should throw RpcException', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        appController.generateTokenPair(undefined)
      }).toThrow(RpcException)
    })

    it('should generate token pair', () => {
      tokens = appController.generateTokenPair(USER_ID)
      timestamp = Math.floor(new Date().getTime() / 1000)

      expect(tokens.jwt).toBeTruthy()
      expect(tokens.refreshToken).toBeTruthy()
    })

    it('should be a valid JWT with correct expiration', () => {
      const decoded = JWT.verify(tokens.jwt, ENV.JWT_SECRET) as JWT.JwtPayload

      expect(decoded.exp).toBeTruthy()
      expect(decoded.uid).toBeTruthy()

      const expiresIn = (decoded.exp as number) - timestamp

      expect(decoded.uid).toEqual(USER_ID)
      expect(expiresIn).toEqual(ENV.JWT_EXPIRES_IN_SECONDS)
    })

    mockRes.mockClear()
  })
})
