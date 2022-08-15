import { HttpException, HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { AuthService } from 'src/auth/auth.service'
import { HashUtil } from 'src/common/utils/hash.util'
import { createMockContext, PrismaMockContext } from 'src/common/test/prisma.mock-context'
import { TokenPair } from 'src/user.interface'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { PrismaService } from 'nestjs-prisma'

const TEST_USER: User = {
  id: 'id',
  name: 'Test',
  email: 'test@email.com',
  password: HashUtil.hashSync('password'),
  createdAt: new Date(),
  updatedAt: new Date(),
} as const

const TEST_TOKENS: TokenPair = {
  jwt: 'jwt',
  refreshToken: 'refreshToken',
} as const

describe('UserController', () => {
  let loginController: LoginController
  let prismaMockContext: PrismaMockContext

  beforeEach(async () => {
    prismaMockContext = createMockContext()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        LoginService,
        {
          provide: AuthService,
          useValue: {
            getTokens: () => Promise.resolve(TEST_TOKENS),
          },
        },
        {
          provide: PrismaService,
          useValue: prismaMockContext.prisma,
        },
      ],
    }).compile()

    loginController = app.get<LoginController>(LoginController)
  })

  it('should be defined', () => {
    expect(loginController).toBeDefined()
  })

  describe('/login', () => {
    it('should login', async () => {
      prismaMockContext.prisma.user.findUnique.mockResolvedValue(TEST_USER)

      const res = await loginController.login({
        email: TEST_USER.email,
        password: 'password',
      })

      expect(res).toBeTruthy()

      expect(res.user).toBeTruthy()
      expect(res.user).toEqual(TEST_USER)

      expect(res.tokens).toBeTruthy()
      expect(res.tokens.jwt).toBe(TEST_TOKENS.jwt)
      expect(res.tokens.refreshToken).toBe(TEST_TOKENS.refreshToken)
    })

    it('should throw', async () => {
      const expectedException = new HttpException(
        'Invalid email address or password',
        HttpStatus.UNAUTHORIZED,
      )

      // Test incorrect email address -- user is not found in the database
      prismaMockContext.prisma.user.findUnique.mockResolvedValue(null)
      await expect(
        loginController.login({
          email: 'incorrect@email.com',
          password: 'password',
        }),
      ).rejects.toThrow(expectedException)

      // Test correct email address, but incorrect password -- user is found in the database
      prismaMockContext.prisma.user.findUnique.mockResolvedValue(TEST_USER)
      await expect(
        loginController.login({
          email: TEST_USER.email,
          password: 'incorrect-password',
        }),
      ).rejects.toThrow(expectedException)
    })
  })
})
