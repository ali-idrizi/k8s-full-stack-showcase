import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { HashUtil } from 'src/common/utils/hash.util'
import { UserDto } from 'src/user.dto'
import { LoginDto } from './login.dto'

@Injectable()
export class LoginService {
  constructor(private readonly prisma: PrismaService) {}

  async login(loginDto: LoginDto): Promise<UserDto> {
    const userData = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    })

    const userDto = plainToInstance(UserDto, userData)
    const isValid = userDto && (await HashUtil.isValid(loginDto.password, userDto.password))

    if (!isValid) {
      throw new HttpException('Invalid email address or password', HttpStatus.UNAUTHORIZED)
    }

    return userDto
  }
}
