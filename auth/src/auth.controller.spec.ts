import { ConfigModule } from '@nestjs/config'
import { RpcException } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { AuthController } from './auth.controller'
import { AuthEnvironment, Tokens } from './auth.interface'
import { AuthService } from './auth.service'
import { createMockContext, PrismaMockContext } from './common/test/prisma.mock-context'
import { JwtStatus, TokenUtil } from './common/utils/token.util'

const REFRESH_TOKEN = 'random-refresh-token'
const USER_ID = 'random-user-uuid'
const ENV: AuthEnvironment = {
  JWT_EXPIRES_IN_SECONDS: '900',
  REFRESH_TOKEN_EXPIRES_IN_SECONDS: '900',
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
            (): AuthEnvironment => {
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

  describe('genTokens', () => {
    let tokens: Tokens
    let timestamp: number

    it('should generate token pair and store the refreshToken', async () => {
      prismaMockContext.prisma.auth.create.mockReturnThis()

      tokens = await authController.genTokens({ userId: USER_ID })
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
      const valid = TokenUtil.verfiyJwt(tokens.jwt, ENV.JWT_SECRET)
      const payload = TokenUtil.decodeJwt(tokens.jwt)

      expect(valid).toEqual(JwtStatus.VALID)
      expect(payload.exp).toBeTruthy()
      expect(payload.uid).toBeTruthy()

      const expiresIn = (payload.exp as number) - timestamp

      expect(payload.uid).toEqual(USER_ID)
      expect(expiresIn).toEqual(parseInt(ENV.JWT_EXPIRES_IN_SECONDS))
    })
  })

  describe('validateJwt', () => {
    it('should verify a valid JWT', () => {
      const jwt = TokenUtil.generateJwt(USER_ID, 60, ENV.JWT_SECRET)
      const res = authController.validateJwt({ jwt })

      expect(res.expired).toEqual(false)
      expect(res.userId).toEqual(USER_ID)
    })

    it('should return expired if JWT is expired', () => {
      const expiredJwt = TokenUtil.generateJwt(USER_ID, 0, ENV.JWT_SECRET)
      const res = authController.validateJwt({ jwt: expiredJwt })

      expect(res.expired).toEqual(true)
      expect(res.userId).toEqual(USER_ID)
    })

    it('should throw if JWT is invalid', () => {
      const invalidSecretJwt = TokenUtil.generateJwt(USER_ID, 60, 'invalid-secret')

      expect(() => {
        authController.validateJwt({ jwt: invalidSecretJwt })
      }).toThrow(RpcException)

      expect(() => {
        authController.validateJwt({ jwt: 'invalid-jwt' })
      }).toThrow(RpcException)
    })
  })

  describe('refreshJwt', () => {
    it('should throw if refresh token is invalid', () => {
      prismaMockContext.prisma.auth.delete.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Row does not exist in the database', {
          code: 'P2025',
          clientVersion: '',
        }),
      )

      expect(async () => {
        await authController.refreshJwt({ refreshToken: REFRESH_TOKEN, userId: USER_ID })
      }).rejects.toThrowError(new RpcException('Invalid refresh token'))
    })

    it('should throw if refresh token is expired', async () => {
      prismaMockContext.prisma.auth.delete.mockResolvedValue({
        refreshToken: REFRESH_TOKEN,
        userId: USER_ID,
        createdAt: new Date(0),
      })

      expect(async () => {
        await authController.refreshJwt({ refreshToken: REFRESH_TOKEN, userId: USER_ID })
      }).rejects.toThrowError(new RpcException('Refresh token is expired'))
    })

    it('should delete the refresh token and return a new token pair', async () => {
      prismaMockContext.prisma.auth.delete.mockResolvedValue({
        refreshToken: REFRESH_TOKEN,
        userId: USER_ID,
        createdAt: new Date(),
      })

      const res = await authController.refreshJwt({ refreshToken: REFRESH_TOKEN, userId: USER_ID })

      expect(prismaMockContext.prisma.auth.delete).toHaveBeenCalledWith({
        where: { refreshToken: REFRESH_TOKEN },
      })
      expect(res.jwt).toBeTruthy()
      expect(res.refreshToken).toBeTruthy()
    })
  })

  describe('removeRefreshToken', () => {
    it('should delete the refresh token', async () => {
      prismaMockContext.prisma.auth.delete.mockReturnThis()

      await authController.removeRefreshToken({ refreshToken: REFRESH_TOKEN })

      expect(prismaMockContext.prisma.auth.delete).toHaveBeenCalledTimes(1)
      expect(prismaMockContext.prisma.auth.delete).toHaveBeenCalledWith({
        where: { refreshToken: REFRESH_TOKEN },
      })
    })

    it('should not throw when the refresh token does not exist', async () => {
      prismaMockContext.prisma.auth.delete.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Row does not exist in the database', {
          code: 'P2025',
          clientVersion: '',
        }),
      )

      expect(async () => {
        await authController.removeRefreshToken({ refreshToken: REFRESH_TOKEN })
      }).not.toThrow()
    })
  })
})
