import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { LoginDto } from './login.dto'
import { ILoginRes } from './login.interface'
import { LoginService } from './login.service'

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto): Promise<ILoginRes> {
    return this.loginService.login(loginDto)
  }
}
