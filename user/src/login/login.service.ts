import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { AuthService } from 'src/auth/auth.service'
import { HashUtil } from 'src/common/utils/hash.util'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserDb } from 'src/user.db'
import { UserDto } from 'src/user.dto'
import { LoginDto } from './login.dto'
import { Response } from './login.interface'

@Injectable()
export class LoginService {
  private readonly userDb: UserDb

  constructor(private authService: AuthService, prisma: PrismaService) {
    this.userDb = new UserDb(prisma)
  }

  async login(loginDto: LoginDto): Promise<Response> {
    const userData = await this.userDb.findByEmail(loginDto.email)
    const user = await this.validateUser(loginDto, userData)
    const tokens = await this.authService.getTokens(user.id)

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
}
