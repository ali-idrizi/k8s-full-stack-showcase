import { Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from 'src/auth/auth.service'

@Controller('logout')
export class LogoutController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request): { success: boolean } {
    const tokens = this.authService.getTokensFromCookies(req.cookies)
    if (tokens.refreshToken) {
      this.authService.removeRefreshToken(tokens.refreshToken)
    }

    this.authService.getClearedCookies().forEach((cookie) => {
      req.res?.cookie(cookie.name, cookie.value, cookie.options)
    })

    return {
      success: true,
    }
  }
}
