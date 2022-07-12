import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from 'src/auth/auth.service'
import { LogoutController } from './logout.controller'
import { LogoutService } from './logout.service'

describe('UserController', () => {
  let logoutController: LogoutController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LogoutController],
      providers: [
        LogoutService,
        {
          provide: AuthService,
          useValue: {
            removeRefreshToken: () => Promise.resolve(),
          },
        },
      ],
    }).compile()

    logoutController = app.get<LogoutController>(LogoutController)
  })

  it('should be defined', () => {
    expect(logoutController).toBeDefined()
  })

  describe('/logout', () => {
    it('should logout', async () => {
      const res = await logoutController.logout({
        refreshToken: 'test-refresh-token',
      })

      expect(res.success).toBe(true)
    })
  })
})
