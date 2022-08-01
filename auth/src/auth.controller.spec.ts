import { getMockRes } from '@jest-mock/express'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import * as JWT from 'jsonwebtoken'
import { AuthController } from './auth.controller'
import { IEnvironment, ITokenPair } from './auth.interface'
import { AuthService } from './auth.service'

const USER_ID = 'random-user-uuid'
const ENV: IEnvironment = {
  JWT_EXPIRES_IN_SECONDS: 900,
  JWT_SECRET: 'secret',
}

describe('AuthController', () => {
  let authController: AuthController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          ignoreEnvVars: true,
          load: [(): IEnvironment => ENV],
        }),
      ],
    }).compile()

    authController = app.get<AuthController>(AuthController)
  })

  describe('generateTokenPair', () => {
    const mockRes = getMockRes()
    let tokens: ITokenPair
    let timestamp: number

    it('should generate token pair', () => {
      tokens = authController.generateTokenPair({ userId: USER_ID })
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
