import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { AuthService } from 'src/auth/auth.service'
import { HashUtil } from 'src/common/utils/hash.util'
import { PrismaService } from 'src/prisma/prisma.service'
import { createMockContext, PrismaMockContext } from 'src/prisma/test/mock-context'
import { ITokenPair } from 'src/user.interface'
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

const TEST_TOKENS: ITokenPair = {
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
            getTokens: () => Promise.resolve(TEST_TOKENS),
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
})
