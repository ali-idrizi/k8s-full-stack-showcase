import { Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common'
import { serialize } from 'cookie'
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

  /**
   * This endpoint is used by ingress-nginx to check if the user is authenticated, it will always return 204,
   * so that the request can be processed by downstream services. A Guard should be used to check if the
   * X-User-ID header is set for routes the require authentication.
   *
   * If the user is authenticated with a valid JWT, it will respond with the X-User-ID header.
   * If the JWT is expired, it will attempt to refresh it, if successful it will respond with the X-User-ID header
   * and 2 additional X-Set-Cookie-* headers, that are converted to Set-Cookie by ingree-nginx.
   *
   * If the user is not authenticated or any of the tokens are invalid, it will not set the X-User-ID header
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
      const jwtStatus = await this.authService.validateJwt(tokens.jwt)

      if (jwtStatus.expired) {
        const newTokens = await this.authService.refreshJwt(tokens.refreshToken, jwtStatus.userId)
        const cookies = this.authService.getCookies(newTokens)

        cookies.forEach((cookie) => {
          req.res?.header(
            `X-Set-Cookie-${cookie.name}`,
            serialize(cookie.name, cookie.value, cookie.options),
          )
        })
      }

      req.res?.header('X-User-ID', jwtStatus.userId)
    } catch (error) {
      // TODO: Maybe clear cookies if invalid JWT or refresh token?
      console.error(error)
    }
  }
}
