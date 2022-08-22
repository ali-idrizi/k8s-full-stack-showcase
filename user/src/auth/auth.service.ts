import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, timeout } from 'rxjs'
import { Tokens } from 'src/user.interface'
import { Command } from './auth.constant'

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  genTokens(userId: string): Promise<Tokens> {
    const tokens = this.authClient
      .send<Tokens>({ cmd: Command.GEN_TOKENS }, { userId })
      .pipe(timeout(10000))

    return firstValueFrom(tokens)
  }

  removeRefreshToken(refreshToken: string): void {
    this.authClient.emit({ cmd: Command.REMOVE_REFRESH_TOKEN }, { refreshToken })
  }
}
