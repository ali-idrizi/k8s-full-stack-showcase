import { Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from 'src/auth/auth.service'

@Controller('logout')
export class LogoutController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request): { success: boolean } {
    this.authService.removeTokens(req.cookies)
    this.authService.getClearedCookies().forEach((cookie) => {
      req.res?.cookie(cookie.name, cookie.value, cookie.options)
    })

    return {
      success: true,
    }
  }
}
