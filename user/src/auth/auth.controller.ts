import { Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  async refreshToken(@Req() req: Request): Promise<void> {
    const tokens = this.authService.getTokensFromCookies(req.cookies)

    const jwtStatus = await this.authService.validateJwt(tokens.jwt)
    const newTokens = await this.authService.refreshJwt(tokens.refreshToken, jwtStatus.userId)

    const cookies = this.authService.getCookies(newTokens)
    cookies.forEach((cookie) => {
      req.res?.cookie(cookie.name, cookie.value, cookie.options)
    })
  }
}
