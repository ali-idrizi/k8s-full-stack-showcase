import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from 'src/auth/auth.service'
import { TEST_ENV } from 'src/common/test/config-module.mock'
import { createMockContext, MockContext } from 'src/common/test/mock-context'
import { NatsModuleMock } from 'src/common/test/nats-module.mock'
import { LogoutController } from './logout.controller'

describe('LogoutController', () => {
  let logoutController: LogoutController
  let authService: AuthService
  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [LogoutController],
      providers: [AuthService],
      imports: [NatsModuleMock.register(ctx.clientProxy)],
    }).compile()

    logoutController = app.get<LogoutController>(LogoutController)
    authService = app.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(logoutController).toBeDefined()
  })

  describe('/logout', () => {
    it('should clear cookies', () => {
      jest.spyOn(authService, 'removeRefreshToken')
      ctx.req.cookies = {
        [TEST_ENV.REFRESH_TOKEN_COOKIE_NAME]: 'test-refresh-token',
      }

      logoutController.logout(ctx.req)

      expect(authService.removeRefreshToken).toHaveBeenCalledWith('test-refresh-token')
      expect(ctx.req.res?.cookie).toHaveBeenCalledWith(
        TEST_ENV.JWT_COOKIE_NAME,
        '',
        expect.objectContaining({ maxAge: 0 }),
      )
      expect(ctx.req.res?.cookie).toHaveBeenCalledWith(
        TEST_ENV.REFRESH_TOKEN_COOKIE_NAME,
        '',
        expect.objectContaining({ maxAge: 0 }),
      )
    })
  })
})
