import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from 'src/auth/auth.service'
import { createMockContext, MockContext } from 'src/common/test/mock-context'
import { Environment } from 'src/user.interface'
import { LogoutController } from './logout.controller'

const ENV: Pick<Environment, 'JWT_COOKIE_NAME' | 'REFRESH_TOKEN_COOKIE_NAME'> = {
  JWT_COOKIE_NAME: 'jwt',
  REFRESH_TOKEN_COOKIE_NAME: 'refresh-token',
}

describe('UserController', () => {
  let logoutController: LogoutController
  let authService: AuthService

  let ctx: MockContext

  beforeEach(async () => {
    ctx = createMockContext()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [LogoutController],
      providers: [
        AuthService,
        {
          provide: 'AUTH_SERVICE',
          useValue: ctx.clientProxy,
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
        [ENV.REFRESH_TOKEN_COOKIE_NAME]: 'test-refresh-token',
      }

      logoutController.logout(ctx.req)

      expect(authService.removeRefreshToken).toHaveBeenCalledWith('test-refresh-token')
      expect(ctx.req.res?.cookie).toHaveBeenCalledWith(
        ENV.JWT_COOKIE_NAME,
        '',
        expect.objectContaining({ maxAge: 0 }),
      )
      expect(ctx.req.res?.cookie).toHaveBeenCalledWith(
        ENV.REFRESH_TOKEN_COOKIE_NAME,
        '',
        expect.objectContaining({ maxAge: 0 }),
      )
    })
  })
})
