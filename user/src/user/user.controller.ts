import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { ILoginRes } from './user.interface'
import { UserService } from './user.service'

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true, stopAtFirstError: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<ILoginRes> {
    return this.userService.login(loginDto)
  }
}
