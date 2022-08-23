import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, timeout } from 'rxjs'
import { Cookie } from 'src/common/interfaces/cookie.interface'
import { ConfigUtil } from 'src/common/utils/config.util'
import { ENV } from 'src/user.constants'
import { Environment, Tokens } from 'src/user.interface'
import { AUTH_CLIENT, Command } from './auth.constant'
import { JwtStatus } from './auth.interface'
import { InvalidRefreshTokenException, JwtInvalidException } from './exceptions'

@Injectable()
export class AuthService {
  private readonly jwtCookieName: string
  private readonly refreshTokenCookieName: string

  constructor(
    @Inject(AUTH_CLIENT) private authClient: ClientProxy,
    configService: ConfigService<Environment>,
  ) {
    const [jwtCookieName, refreshTokenCookieName] = ConfigUtil.getMultiple(configService, [
      ENV.JWT_COOKIE_NAME,
      ENV.REFRESH_TOKEN_COOKIE_NAME,
    ])

    this.jwtCookieName = jwtCookieName
    this.refreshTokenCookieName = refreshTokenCookieName
  }

  genTokens(userId: string): Promise<Tokens> {
    const tokens = this.authClient
      .send<Tokens>({ cmd: Command.GEN_TOKENS }, { userId })
      .pipe(timeout(10000))

    return firstValueFrom(tokens)
  }

  async validateJwt(jwt: string): Promise<JwtStatus> {
    const res = this.authClient
      .send<JwtStatus>({ cmd: Command.VALIDATE_JWT }, { jwt })
      .pipe(timeout(10000))

    let data
    try {
      data = await firstValueFrom(res)
    } catch (error) {
      throw new JwtInvalidException(error)
    }

    return data
  }

  async refreshJwt(refreshToken: string, userId: string): Promise<Tokens> {
    const res = this.authClient
      .send<Tokens>({ cmd: Command.REFRESH_JWT }, { refreshToken, userId })
      .pipe(timeout(10000))

    let data
    try {
      data = await firstValueFrom(res)
    } catch (error) {
      throw new InvalidRefreshTokenException(error)
    }

    return data
  }

  removeRefreshToken(refreshToken: string): void {
    this.authClient.emit({ cmd: Command.REMOVE_REFRESH_TOKEN }, { refreshToken })
  }

  getCookies(tokens: Tokens): Cookie[] {
    return [
      {
        name: this.jwtCookieName,
        value: tokens.jwt,
        options: {
          path: '/',
        },
      },
      {
        name: this.refreshTokenCookieName,
        value: tokens.refreshToken,
        options: {
          path: '/',
        },
      },
    ]
  }

  getTokensFromCookies(cookies: Record<string, string>): Tokens {
    return {
      jwt: cookies[this.jwtCookieName],
      refreshToken: cookies[this.refreshTokenCookieName],
    }
  }

  getClearedCookies(): Cookie[] {
    return [
      {
        name: this.jwtCookieName,
        value: '',
        options: {
          maxAge: 0,
        },
      },
      {
        name: this.refreshTokenCookieName,
        value: '',
        options: {
          maxAge: 0,
        },
      },
    ]
  }
}
