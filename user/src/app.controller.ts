import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { User } from '@prisma/client'
import { catchError, Observable } from 'rxjs'
import { ITokenPair } from './app.interface'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private client: ClientProxy,
  ) {}

  @Get('/')
  async getUsers(): Promise<User[]> {
    return await this.appService.getUsers()
  }

  @Post('/add')
  async addUser(@Body('name') name: string): Promise<User> {
    return await this.appService.addUser(name)
  }

  @Post('/login')
  login(): Observable<ITokenPair> {
    return this.client
      .send<ITokenPair>(
        {
          cmd: 'generateTokenPair',
        },
        {
          userId: 'test',
        },
      )
      .pipe(
        catchError((err) => {
          throw new BadRequestException(err.message)
        }),
      )
  }
}
