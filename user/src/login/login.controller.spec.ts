import { HttpException, HttpStatus } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { of } from 'rxjs'
import { AuthService } from 'src/auth/auth.service'
import { createMockContext, MockContext } from 'src/common/test/mock-context'
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
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        LoginService,
        AuthService,
        {
          provide: 'AUTH_SERVICE',
          useValue: ctx.clientProxy,
        },
        {
          provide: PrismaService,
          useValue: ctx.prisma,
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
  })

  it('should be defined', () => {
    expect(loginController).toBeDefined()
  })

  describe('/login', () => {
    it('should login and set cookies', async () => {
      ctx.prisma.user.findUnique.mockResolvedValue(TEST_USER)
      ctx.clientProxy.send.mockReturnValue(of(TEST_TOKENS))

      const user = await loginController.login(ctx.req, {
        email: TEST_USER.email,
        password: 'password',
      })

      expect(user).toEqual(TEST_USER)

      expect(ctx.req.res?.cookie).toHaveBeenCalledWith(
        ENV.JWT_COOKIE_NAME,
        TEST_TOKENS.jwt,
        expect.anything(),
      )
      expect(ctx.req.res?.cookie).toHaveBeenCalledWith(
        ENV.REFRESH_TOKEN_COOKIE_NAME,
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
      ctx.prisma.user.findUnique.mockResolvedValue(null)
      await expect(
        loginController.login(ctx.req, {
          email: 'incorrect@email.com',
          password: 'password',
        }),
      ).rejects.toThrow(expectedException)

      // Test correct email address, but incorrect password -- user is found in the database
      ctx.prisma.user.findUnique.mockResolvedValue(TEST_USER)
      await expect(
        loginController.login(ctx.req, {
          email: TEST_USER.email,
          password: 'incorrect-password',
        }),
      ).rejects.toThrow(expectedException)
    })
  })
})
