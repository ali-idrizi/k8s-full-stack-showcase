import { getMockRes } from '@jest-mock/express'
import { BadRequestException } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
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
  let configService: ConfigService

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
    configService = app.get<ConfigService>(ConfigService)
  })

  describe('/generate', () => {
    const mockRes = getMockRes()
    let tokens: ITokenPair
    let timestamp: number

    it('should throw BadRequestException', () => {
      expect(() => {
        // @ts-ignore
        appController.generateTokenPair({ userId: undefined }, mockRes.res)
      }).toThrow(BadRequestException)
    })

    it('should generate token pair', () => {
      tokens = appController.generateTokenPair({ userId: USER_ID }, mockRes.res)
      timestamp = Math.floor(new Date().getTime() / 1000)

      expect(tokens.jwt).toBeTruthy()
      expect(tokens.refreshToken).toBeTruthy()
    })

    it('should be a valid JWT with correct expiration', () => {
      const jwtSecret = configService.get('JWT_SECRET')
      const jwtExpiresIn = configService.get('JWT_EXPIRES_IN_SECONDS')

      const decoded = JWT.verify(tokens.jwt, jwtSecret) as JWT.JwtPayload

      expect(decoded.exp).toBeTruthy()
      expect(decoded.uid).toBeTruthy()

      const expiresIn = decoded.exp! - timestamp

      expect(decoded.uid).toEqual(USER_ID)
      expect(expiresIn).toEqual(jwtExpiresIn)
    })

    it('should set tokens as cookies', () => {
      expect(mockRes.res.cookie).toHaveBeenCalledTimes(2)
      expect(mockRes.res.cookie).toHaveBeenCalledWith('jwt', tokens.jwt, {
        secure: true,
      })
      expect(mockRes.res.cookie).toHaveBeenCalledWith('refresh-token', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
      })
    })

    mockRes.mockClear()
  })
})
