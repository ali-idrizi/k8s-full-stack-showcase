import { getMockRes } from '@jest-mock/express'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import * as JWT from 'jsonwebtoken'
import { AppController } from './app.controller'
import { IEnvironment, ITokenPair } from './app.interface'
import { AppService } from './app.service'

const env: IEnvironment = {
  JWT_EXPIRES_IN_SECONDS: 900,
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
          load: [(): IEnvironment => env],
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

    it('should generate token pair', () => {
      tokens = appController.generateTokenPair({ userId: 'random-uuid' }, mockRes.res)
      timestamp = Math.floor(new Date().getTime() / 1000)

      expect(tokens.jwt).toBeTruthy()
      expect(tokens.refreshToken).toBeTruthy()
    })

    it('should be a valid JWT with correct expiration', () => {
      const decoded = JWT.verify(tokens.jwt, 'secret', { ignoreExpiration: true }) as JWT.JwtPayload

      expect(decoded.exp).toBeTruthy()
      expect(decoded.uid).toBeTruthy()

      const expiresIn = decoded.exp! - timestamp

      expect(decoded.uid).toEqual('random-uuid')
      expect(expiresIn).toEqual(configService.get('JWT_EXPIRES_IN_SECONDS'))
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
