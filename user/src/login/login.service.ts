import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { User } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { firstValueFrom, timeout } from 'rxjs'
import { HashUtil } from 'src/common/utils/hash.util'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserDb } from 'src/user.db'
import { UserDto } from 'src/user.dto'
import { ITokenPair } from 'src/user.interface'
import { LoginDto } from './login.dto'
import { ILoginRes } from './login.interface'

@Injectable()
export class LoginService {
  private readonly userDb: UserDb

  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy, prisma: PrismaService) {
    this.userDb = new UserDb(prisma)
  }

  async login(loginDto: LoginDto): Promise<ILoginRes> {
    const userData = await this.userDb.findByEmail(loginDto.email)
    const user = await this.validateUser(loginDto, userData)
    const tokens = await this.getTokens(user)

    return {
      user,
      tokens: tokens,
    }
  }

  private async validateUser(loginInput: LoginDto, userData: User | null): Promise<UserDto> {
    if (userData !== null) {
      const user = plainToInstance(UserDto, userData)
      const isPasswordValid = await HashUtil.isValid(loginInput.password, user.password)

      if (isPasswordValid) {
        return user
      }
    }

    throw new HttpException('Invalid email address or password', HttpStatus.UNAUTHORIZED)
  }

  private getTokens(user: User): Promise<ITokenPair> {
    const tokens = this.authClient
      .send<ITokenPair>({ cmd: 'generateTokenPair' }, { userId: user.id })
      .pipe(timeout(10000))

    return firstValueFrom(tokens)
  }
}
