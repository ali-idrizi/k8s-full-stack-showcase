import { Body, Controller, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from 'src/auth/auth.service'
import { UserDto } from 'src/user.dto'
import { RegisterDto } from './register.dto'
import { RegisterService } from './register.service'

@Controller('register')
export class RegisterController {
  constructor(
    private readonly authService: AuthService,
    private readonly registerService: RegisterService,
  ) {}

  @Post('/')
  async register(@Req() req: Request, @Body() registerDto: RegisterDto): Promise<UserDto> {
    const user = await this.registerService.register(registerDto)

    const cookies = await this.authService.getCookies(user.id)
    cookies.forEach((cookie) => {
      req.res?.cookie(cookie.name, cookie.value, cookie.options)
    })

    return user
  }
}
