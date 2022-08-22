import { HttpException, HttpStatus } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientProxy } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { Response } from 'express'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PrismaService } from 'nestjs-prisma'
import { of } from 'rxjs'
import { AuthService } from 'src/auth/auth.service'
import { HashUtil } from 'src/common/utils/hash.util'
import { Environment, Tokens } from 'src/user.interface'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'

const TEST_USER: User = {
  id: 'id',
  name: 'Test',
  email: 'test@email.com',
  password: HashUtil.hashSync('password'),
  createdAt: new Date(),
  updatedAt: new Date(),
} as const

const TEST_TOKENS: Tokens = {
  jwt: 'jwt',
  refreshToken: 'refreshToken',
} as const

const ENV: Partial<Environment> = {
  JWT_COOKIE_NAME: 'jwt',
  REFRESH_TOKEN_COOKIE_NAME: 'refresh-token',
}

describe('UserController', () => {
  let loginController: LoginController

  let prisma: DeepMockProxy<PrismaService>
  let authClient: DeepMockProxy<ClientProxy>
  let res: DeepMockProxy<Response>

  beforeEach(async () => {
    prisma = mockDeep()
    authClient = mockDeep()
    res = mockDeep()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        LoginService,
        AuthService,
        {
          provide: 'AUTH_SERVICE',
          useValue: authClient,
        },
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          load: [
            (): Partial<Environment> => {
              // Delete variables defined in `ENV` from `process.env`
              // TODO: Use `ignoreEnvVarsOnGet` when https://github.com/nestjs/config/pull/997 is merged
              Object.keys(ENV).forEach((key) => delete process.env[key])

              return ENV
            },
          ],
        }),
      ],
    }).compile()

    loginController = app.get<LoginController>(LoginController)
    authClient = app.get<DeepMockProxy<ClientProxy>>('AUTH_SERVICE')
  })

  it('should be defined', () => {
    expect(loginController).toBeDefined()
  })

  describe('/login', () => {
    it('should login and set cookies', async () => {
      prisma.user.findUnique.mockResolvedValue(TEST_USER)
      authClient.send.mockReturnValue(of(TEST_TOKENS))

      const user = await loginController.login(res, {
        email: TEST_USER.email,
        password: 'password',
      })

      expect(user).toBeTruthy()
      expect(user).toEqual(TEST_USER)

      expect(res.cookie).toHaveBeenCalledWith('jwt', TEST_TOKENS.jwt, expect.anything())
      expect(res.cookie).toHaveBeenCalledWith(
        'refresh-token',
        TEST_TOKENS.refreshToken,
        expect.anything(),
      )
    })

    it('should throw', async () => {
      const expectedException = new HttpException(
        'Invalid email address or password',
        HttpStatus.UNAUTHORIZED,
      )

      // Test incorrect email address -- user is not found in the database
      prisma.user.findUnique.mockResolvedValue(null)
      await expect(
        loginController.login(res, {
          email: 'incorrect@email.com',
          password: 'password',
        }),
      ).rejects.toThrow(expectedException)

      // Test correct email address, but incorrect password -- user is found in the database
      prisma.user.findUnique.mockResolvedValue(TEST_USER)
      await expect(
        loginController.login(res, {
          email: TEST_USER.email,
          password: 'incorrect-password',
        }),
      ).rejects.toThrow(expectedException)
    })
  })
})
