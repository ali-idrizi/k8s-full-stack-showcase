import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { of } from 'rxjs'
import { AuthService } from 'src/auth/auth.service'
import { TEST_ENV } from 'src/common/test/config-module.mock'
import { createMockContext, MockContext } from 'src/common/test/mock-context'
import { NatsModuleMock } from 'src/common/test/nats-module.mock'
import { HashUtil } from 'src/common/utils/hash.util'
import { Tokens } from 'src/user.interface'
import { RegisterController } from './register.controller'
import { RegisterService } from './register.service'

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

describe('RegisterController', () => {
  let registerController: RegisterController
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        RegisterService,
        AuthService,
        {
          provide: PrismaService,
          useValue: ctx.prisma,
        },
      ],
      imports: [NatsModuleMock.register(ctx.clientProxy)],
    }).compile()

    registerController = app.get<RegisterController>(RegisterController)
  })

  it('should be defined', () => {
    expect(registerController).toBeDefined()
  })

  describe('/register', () => {
    const registerData = {
      name: TEST_USER.name,
      email: TEST_USER.email,
      password: 'password',
      confirmPassword: 'password',
    }

    it('should create user set cookies', async () => {
      ctx.prisma.user.create.mockResolvedValue(TEST_USER)
      ctx.clientProxy.send.mockReturnValue(of(TEST_TOKENS))

      const user = await registerController.register(ctx.req, registerData, undefined)

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
      await expect(registerController.register(ctx.req, registerData, 'true')).rejects.toThrow(
        BadRequestException,
      )

      // Test that a correct HttpException is thrown when the email is already registered
      ctx.prisma.user.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Invalid `this.prisma.user.create()` invocation', {
          code: 'P2002',
          clientVersion: '',
        }),
      )
      await expect(registerController.register(ctx.req, registerData, undefined)).rejects.toThrow(
        new HttpException('Email address is already registered', HttpStatus.CONFLICT),
      )

      // Test that the same error is thrown in every other case
      ctx.prisma.user.create.mockRejectedValue(new Error())
      await expect(registerController.register(ctx.req, registerData, undefined)).rejects.toThrow(
        new Error(),
      )
    })
  })
})
