import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { AuthService } from 'src/auth/auth.service'
import { HashUtil } from 'src/common/utils/hash.util'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserDb } from 'src/user.db'
import { UserDto } from 'src/user.dto'
import { RegisterDto } from './register.dto'
import { Response } from './register.interface'

@Injectable()
export class RegisterService {
  private readonly userDb: UserDb

  constructor(private authService: AuthService, prisma: PrismaService) {
    this.userDb = new UserDb(prisma)
  }

  async register(registerDto: RegisterDto): Promise<Response> {
    let userData: User

    try {
      userData = await this.userDb.createUser({
        name: registerDto.name,
        email: registerDto.email,
        password: await HashUtil.hash(registerDto.password),
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Email address is already registered', HttpStatus.CONFLICT)
        }
      }

      throw error
    }

    const user = plainToInstance(UserDto, userData)
    const tokens = await this.authService.getTokens(user.id)

    return {
      user,
      tokens,
    }
  }
}
