import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from 'src/auth/auth.service'
import { UserDto } from 'src/user.dto'
import { LoginDto } from './login.dto'
import { LoginService } from './login.service'

@Controller('login')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly loginService: LoginService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request, @Body() loginDto: LoginDto): Promise<UserDto> {
    const user = await this.loginService.login(loginDto)

    const tokens = await this.authService.genTokens(user.id)
    const cookies = this.authService.getCookies(tokens)
    cookies.forEach((cookie) => {
      req.res?.cookie(cookie.name, cookie.value, cookie.options)
    })

    return user
  }
}
