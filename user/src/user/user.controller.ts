import { BadRequestException, Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { User } from '@prisma/client'
import { catchError, Observable } from 'rxjs'
import { ITokenPair } from './user.interface'
import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('AUTH_SERVICE') private client: ClientProxy,
  ) {}

  @Get('/')
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers()
  }
}
