import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { User } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { firstValueFrom, timeout } from 'rxjs'
import { ErrorUtil } from 'src/common/utils/error.util'
import { HashUtil } from 'src/common/utils/hash.util'
import { COMMAND, NATS_CLIENT } from 'src/nats/nats.constants'
import { UserDto } from 'src/user.dto'
import { RegisterDto } from './register.dto'

@Injectable()
export class RegisterService {
  constructor(
    @Inject(NATS_CLIENT) private readonly natsClient: ClientProxy,
    private readonly prisma: PrismaService,
  ) {}

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

      try {
        const res = this.natsClient
          .send({ cmd: COMMAND.todo.userCreated }, { userId: userData.id })
          .pipe(timeout(2000))

        await firstValueFrom(res)
      } catch {}
    } catch (error) {
      if (ErrorUtil.isConstraintFailedError(error)) {
        throw new HttpException('Email address is already registered', HttpStatus.CONFLICT)
      }

      throw error
    }

    return plainToInstance(UserDto, userData)
  }
}
