import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from 'src/auth/auth.service'
import { LogoutController } from './logout.controller'
import { LogoutService } from './logout.service'

describe('UserController', () => {
  let logoutController: LogoutController
  let authService: AuthService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LogoutController],
      providers: [
        LogoutService,
        {
          provide: AuthService,
          useValue: {
            removeRefreshToken: jest.fn(),
          },
        },
      ],
    }).compile()

    logoutController = app.get<LogoutController>(LogoutController)
    authService = app.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(logoutController).toBeDefined()
  })

  describe('/logout', () => {
    it('should logout', () => {
      const res = logoutController.logout({
        refreshToken: 'test-refresh-token',
      })

      expect(authService.removeRefreshToken).toHaveBeenCalledTimes(1)
      expect(res.success).toBe(true)
    })
  })
})
