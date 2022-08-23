import { Test, TestingModule } from '@nestjs/testing'
import { any, objectContainsValue } from 'jest-mock-extended'
import { of } from 'rxjs'
import { ConfigModuleMock, TEST_ENV } from 'src/common/test/config-module.mock'
import { createMockContext, MockContext } from 'src/common/test/mock-context'
import { AUTH_CLIENT, Command } from './auth.constant'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let authController: AuthController
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AUTH_CLIENT,
          useValue: ctx.clientProxy,
        },
      ],
      imports: [ConfigModuleMock],
    }).compile()

    authController = app.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  describe('/refresh-token', () => {
    it('should refresh the token and set new cookies', async () => {
      ctx.req.cookies = {
        [TEST_ENV.REFRESH_TOKEN_COOKIE_NAME]: 'test-refresh-token',
      }

      ctx.clientProxy.send
        .calledWith(objectContainsValue(Command.VALIDATE_JWT), any())
        .mockReturnValue(of({ expired: false, userId: 'test-user-id' }))

      ctx.clientProxy.send
        .calledWith(objectContainsValue(Command.REFRESH_JWT), any())
        .mockReturnValue(of({ jwt: 'new-test-jwt', refreshToken: 'new-test-refresh-token' }))

      await authController.refreshToken(ctx.req)

      expect(ctx.clientProxy.send).toHaveBeenCalledWith(
        { cmd: Command.REFRESH_JWT },
        {
          refreshToken: 'test-refresh-token',
          userId: 'test-user-id',
        },
      )

      expect(ctx.req.res?.cookie).toHaveBeenCalledWith(
        TEST_ENV.JWT_COOKIE_NAME,
        'new-test-jwt',
        expect.anything(),
      )

      expect(ctx.req.res?.cookie).toHaveBeenCalledWith(
        TEST_ENV.REFRESH_TOKEN_COOKIE_NAME,
        'new-test-refresh-token',
        expect.anything(),
      )
    })
  })
})
