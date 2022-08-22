import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy } from '@nestjs/microservices'
import { Response } from 'express'
import { firstValueFrom, timeout } from 'rxjs'
import { ConfigUtil } from 'src/common/utils/config.util'
import { ENV } from 'src/user.constants'
import { Environment, Tokens } from 'src/user.interface'
import { Command } from './auth.constant'

@Injectable()
export class AuthService {
  jwtCookieName: string
  refreshTokenCookieName: string

  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
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

  removeRefreshToken(refreshToken: string): void {
    this.authClient.emit({ cmd: Command.REMOVE_REFRESH_TOKEN }, { refreshToken })
  }

  async setTokens(res: Response, userId: string): Promise<void> {
    const tokens = await this.genTokens(userId)

    res.cookie(this.jwtCookieName, tokens.jwt, {
      path: '/',
    })

    res.cookie(this.refreshTokenCookieName, tokens.refreshToken, {
      path: '/',
    })
  }
}
