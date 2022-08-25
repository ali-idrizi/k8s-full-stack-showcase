import { Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  async refreshToken(@Req() req: Request): Promise<void> {
    const tokens = this.authService.getTokensFromCookies(req.cookies)

    const { userId } = await this.authService.validateJwt(tokens.jwt)
    const newTokens = await this.authService.refreshJwt(tokens.refreshToken, userId)
    const cookies = this.authService.getCookies(newTokens)
    cookies.forEach((cookie) => {
      req.res?.cookie(cookie.name, cookie.value, cookie.options)
    })
  }

  /**
   * This endpoint is used by ingress-nginx to check if the user is authenticated, it will always return 204,
   * so that the request can be processed by downstream services. A Guard should be used to check if the
   * X-User-ID header is set for routes that require authentication.
   *
   * If the user is authenticated with a valid JWT, it will respond with the X-User-ID header
   * If the JWT is expired, none or invalid tokens are present, it will not set the X-User-ID header at all
   *
   * @param req the express Request object
   */
  @Get('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async auth(@Req() req: Request): Promise<void> {
    const tokens = this.authService.getTokensFromCookies(req.cookies)

    if (!tokens.jwt || !tokens.refreshToken) {
      return
    }

    try {
      const { expired, userId } = await this.authService.validateJwt(tokens.jwt)

      if (!expired) {
        req.res?.header('X-User-ID', userId)
      }
    } catch (error) {
      // TODO: Maybe clear cookies if invalid JWT or refresh token?
      console.error(error)
    }
  }
}
