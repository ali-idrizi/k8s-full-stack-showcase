import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LoginDto } from './login.dto'
import { ILoginRes } from './login.interface'
import { LoginService } from './login.service'

@Controller('login')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true, stopAtFirstError: true }))
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto): Promise<ILoginRes> {
    return this.loginService.login(loginDto)
  }
}
