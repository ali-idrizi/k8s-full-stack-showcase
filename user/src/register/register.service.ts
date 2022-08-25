import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { ErrorUtil } from 'src/common/utils/error.util'
import { HashUtil } from 'src/common/utils/hash.util'
import { UserDto } from 'src/user.dto'
import { RegisterDto } from './register.dto'

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerDto: RegisterDto): Promise<UserDto> {
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

    return plainToInstance(UserDto, userData)
  }
}
