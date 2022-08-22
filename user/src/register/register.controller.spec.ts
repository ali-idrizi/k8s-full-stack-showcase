import { HttpException, HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { AuthService } from 'src/auth/auth.service'
import { createMockContext, PrismaMockContext } from 'src/common/test/prisma.mock-context'
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

describe('UserController', () => {
  let registerController: RegisterController
  let prismaMockContext: PrismaMockContext

  beforeEach(async () => {
    prismaMockContext = createMockContext()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        RegisterService,
        {
          provide: AuthService,
          useValue: {
            genTokens: () => Promise.resolve(TEST_TOKENS),
          },
        },
        {
          provide: PrismaService,
          useValue: prismaMockContext.prisma,
        },
      ],
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

    it('should create user and tokens', async () => {
      prismaMockContext.prisma.user.create.mockResolvedValue(TEST_USER)

      const res = await registerController.register(registerData)

      expect(res).toEqual({
        user: TEST_USER,
        tokens: TEST_TOKENS,
      })
    })

    it('should throw', async () => {
      // Test that a correct HttpException is thrown when the email is already registered
      prismaMockContext.prisma.user.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          'Invalid `this.prisma.user.create()` invocation',
          'P2002',
          '',
        ),
      )
      await expect(registerController.register(registerData)).rejects.toThrow(
        new HttpException('Email address is already registered', HttpStatus.CONFLICT),
      )

      // Test that the same error is thrown in every other case
      prismaMockContext.prisma.user.create.mockRejectedValue(new Error())
      await expect(registerController.register(registerData)).rejects.toThrow(new Error())
    })
  })
})
