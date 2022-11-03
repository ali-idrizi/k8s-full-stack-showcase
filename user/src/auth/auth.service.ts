import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, timeout } from 'rxjs'
import { Cookie } from 'src/common/interfaces/cookie.interface'
import { ConfigUtil } from 'src/common/utils/config.util'
import { COMMAND, NATS_CLIENT } from 'src/nats/nats.constants'
import { ENV } from 'src/user.constants'
import { Environment, Tokens } from 'src/user.interface'
import { JwtStatus } from './auth.interface'
import { InvalidJwtException, InvalidRefreshTokenException } from './exceptions'

@Injectable()
export class AuthService {
  private readonly jwtCookieName: string
  private readonly refreshTokenCookieName: string

  constructor(
    @Inject(NATS_CLIENT) private natsClient: ClientProxy,
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
    const tokens = this.natsClient
      .send<Tokens>({ cmd: COMMAND.auth.genTokens }, { userId })
      .pipe(timeout(10000))

    return firstValueFrom(tokens)
  }

  async validateJwt(jwt: string): Promise<JwtStatus> {
    const res = this.natsClient
      .send<JwtStatus>({ cmd: COMMAND.auth.validateJwt }, { jwt })
      .pipe(timeout(10000))

    let data
    try {
      data = await firstValueFrom(res)
    } catch (error) {
      throw new InvalidJwtException(error)
    }

    return data
  }

  async refreshJwt(refreshToken: string, userId: string): Promise<Tokens> {
    const res = this.natsClient
      .send<Tokens>({ cmd: COMMAND.auth.refreshJwt }, { refreshToken, userId })
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
    this.natsClient.emit({ cmd: COMMAND.auth.removeRefreshToken }, { refreshToken })
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
