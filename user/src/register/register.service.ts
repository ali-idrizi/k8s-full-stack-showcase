import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { Response } from 'express'
import { PrismaService } from 'nestjs-prisma'
import { AuthService } from 'src/auth/auth.service'
import { ErrorUtil } from 'src/common/utils/error.util'
import { HashUtil } from 'src/common/utils/hash.util'
import { UserDto } from 'src/user.dto'
import { RegisterDto } from './register.dto'

@Injectable()
export class RegisterService {
  constructor(private authService: AuthService, private prisma: PrismaService) {}

  async register(res: Response, registerDto: RegisterDto): Promise<UserDto> {
    let userData: User

    try {
      userData = await this.prisma.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          password: await HashUtil.hash(registerDto.password),
        },
      })
    } catch (error) {
      if (ErrorUtil.isConstraintFailedError(error)) {
        throw new HttpException('Email address is already registered', HttpStatus.CONFLICT)
      }

      throw error
    }

    await this.authService.setTokens(res, userData.id)

    return plainToInstance(UserDto, userData)
  }
}
