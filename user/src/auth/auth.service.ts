import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, timeout } from 'rxjs'
import { TokenPair } from 'src/user.interface'
import { Command } from './auth.constant'

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  getTokens(userId: string): Promise<TokenPair> {
    const tokens = this.authClient
      .send<TokenPair>({ cmd: Command.GENERATE_TOKEN_PAIR }, { userId })
      .pipe(timeout(10000))

    return firstValueFrom(tokens)
  }
}
