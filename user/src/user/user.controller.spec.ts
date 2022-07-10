import { HttpException, HttpStatus } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { Observable, of } from 'rxjs'
import { IEnvironment } from 'src/app.interface'
import { PrismaService } from 'src/prisma/prisma.service'
import { createMockContext, PrismaMockContext } from 'src/prisma/test/context'
import { UserController } from './user.controller'
import { ITokenPair } from './user.interface'
import { UserService } from './user.service'

const TEST_USER: User = {
  email: 'test@email.com',
  password: bcrypt.hashSync('password', 12),
  name: 'Test',
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 'id',
} as const

const TEST_TOKENS: ITokenPair = {
  jwt: 'jwt',
  refreshToken: 'refreshToken',
} as const

const ENV: IEnvironment = {} as const

describe('UserController', () => {
  let userController: UserController
  let prismaMockContext: PrismaMockContext

  beforeEach(async () => {
    prismaMockContext = createMockContext()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: 'AUTH_SERVICE',
          useValue: {
            send: of.bind(null, TEST_TOKENS),
          },
        },
        {
          provide: PrismaService,
          useValue: prismaMockContext.prisma,
        },
      ],
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          ignoreEnvVars: true,
          load: [(): IEnvironment => ENV],
        }),
      ],
    }).compile()

    userController = app.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
  })

  describe('/login', () => {
    it('should login', async () => {
      prismaMockContext.prisma.user.findUnique.mockResolvedValue(TEST_USER)

      const res = await userController.login({
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

      prismaMockContext.prisma.user.findUnique.mockResolvedValue(null)
      await expect(
        userController.login({
          email: 'invalid@email.com',
          password: 'password',
        }),
      ).rejects.toThrow(expectedException)

      prismaMockContext.prisma.user.findUnique.mockResolvedValue(TEST_USER)
      await expect(
        userController.login({
          email: TEST_USER.email,
          password: 'invalid-password',
        }),
      ).rejects.toThrow(expectedException)
    })
  })
})
