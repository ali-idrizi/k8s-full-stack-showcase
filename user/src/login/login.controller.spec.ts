import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { of } from 'rxjs'
import { AuthService } from 'src/auth/auth.service'
import { NatsModuleMock } from 'src/common/test/nats-module.mock'
import { TEST_ENV } from 'src/common/test/config-module.mock'
import { createMockContext, MockContext } from 'src/common/test/mock-context'
import { HashUtil } from 'src/common/utils/hash.util'
import { Tokens } from 'src/user.interface'
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

describe('LoginController', () => {
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
          provide: PrismaService,
          useValue: ctx.prisma,
        },
      ],
      imports: [NatsModuleMock.register(ctx.clientProxy)],
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

      const user = await loginController.login(
        ctx.req,
        {
          email: TEST_USER.email,
          password: 'password',
        },
        undefined,
      )

      expect(user).toEqual(TEST_USER)

      expect(ctx.req.res?.cookie).toHaveBeenCalledWith(
        TEST_ENV.JWT_COOKIE_NAME,
        TEST_TOKENS.jwt,
        expect.anything(),
      )
      expect(ctx.req.res?.cookie).toHaveBeenCalledWith(
        TEST_ENV.REFRESH_TOKEN_COOKIE_NAME,
        TEST_TOKENS.refreshToken,
        expect.anything(),
      )
    })

    it('should throw', async () => {
      // Test user is already authenticated
      await expect(
        loginController.login(ctx.req, { email: '', password: '' }, 'true'),
      ).rejects.toThrow(BadRequestException)

      const expectedException = new HttpException(
        'Invalid email address or password',
        HttpStatus.UNAUTHORIZED,
      )

      // Test incorrect email address -- user is not found in the database
      ctx.prisma.user.findUnique.mockResolvedValue(null)
      await expect(
        loginController.login(
          ctx.req,
          {
            email: 'incorrect@email.com',
            password: 'password',
          },
          undefined,
        ),
      ).rejects.toThrow(expectedException)

      // Test correct email address, but incorrect password -- user is found in the database
      ctx.prisma.user.findUnique.mockResolvedValue(TEST_USER)
      await expect(
        loginController.login(
          ctx.req,
          {
            email: TEST_USER.email,
            password: 'incorrect-password',
          },
          undefined,
        ),
      ).rejects.toThrow(expectedException)
    })
  })
})
