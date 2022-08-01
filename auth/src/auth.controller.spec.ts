import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import * as JWT from 'jsonwebtoken'
import { PrismaService } from 'nestjs-prisma'
import { AuthController } from './auth.controller'
import { IEnvironment, ITokenPair } from './auth.interface'
import { AuthService } from './auth.service'
import { createMockContext, PrismaMockContext } from './common/test/prisma.mock-context'

const USER_ID = 'random-user-uuid'
const ENV: IEnvironment = {
  JWT_EXPIRES_IN_SECONDS: '900',
  JWT_SECRET: 'secret',
}

describe('AuthController', () => {
  let authController: AuthController
  let prismaMockContext: PrismaMockContext

  beforeEach(async () => {
    prismaMockContext = createMockContext()
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaMockContext.prisma,
        },
      ],
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          load: [
            (): IEnvironment => {
              // Delete variables defined in `ENV` from `process.env`
              // TODO: Use `ignoreEnvVarsOnGet` when https://github.com/nestjs/config/pull/997 is merged
              Object.keys(ENV).forEach((key) => delete process.env[key])

              return ENV
            },
          ],
        }),
      ],
    }).compile()

    authController = app.get<AuthController>(AuthController)
  })

  describe('generateTokenPair', () => {
    let tokens: ITokenPair
    let timestamp: number

    it('should generate token pair and store the refreshToken', async () => {
      prismaMockContext.prisma.auth.create.mockReturnThis()

      tokens = await authController.generateTokenPair({ userId: USER_ID })
      timestamp = Math.floor(new Date().getTime() / 1000)

      expect(tokens.jwt).toBeTruthy()
      expect(tokens.refreshToken).toBeTruthy()

      expect(prismaMockContext.prisma.auth.create).toHaveBeenCalledTimes(1)
      expect(prismaMockContext.prisma.auth.create).toHaveBeenCalledWith({
        data: {
          userId: USER_ID,
          refreshToken: tokens.refreshToken,
        },
      })
    })

    it('should be a valid JWT with correct expiration', () => {
      const decoded = JWT.verify(tokens.jwt, ENV.JWT_SECRET) as JWT.JwtPayload

      expect(decoded.exp).toBeTruthy()
      expect(decoded.uid).toBeTruthy()

      const expiresIn = (decoded.exp as number) - timestamp

      expect(decoded.uid).toEqual(USER_ID)
      expect(expiresIn).toEqual(parseInt(ENV.JWT_EXPIRES_IN_SECONDS))
    })
  })
})
