import { Body, Controller, Get, Post } from '@nestjs/common'
import { User } from '@prisma/client'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getUsers(): Promise<User[]> {
    return await this.appService.getUsers()
  }

  @Post('/add')
  async addUser(@Body('name') name: string): Promise<User> {
    return await this.appService.addUser(name)
  }
}
