import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { UserDto } from 'src/user.dto'
import { LoginDto } from './login.dto'
import { LoginService } from './login.service'

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  login(@Res() res: Response, @Body() loginDto: LoginDto): Promise<UserDto> {
    return this.loginService.login(res, loginDto)
  }
}
