import { BadRequestException, Body, Controller, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { Header } from 'src/auth/auth.constant'
import { AuthService } from 'src/auth/auth.service'
import { ReqHeader } from 'src/common/decorators/req-header.decorator'
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
  async register(
    @Req() req: Request,
    @Body() registerDto: RegisterDto,
    @ReqHeader(Header.AUTH) authenticated: string | undefined,
  ): Promise<UserDto> {
    if (authenticated === 'true') {
      throw new BadRequestException('User is already authenticated')
    }

    const user = await this.registerService.register(registerDto)

    const tokens = await this.authService.genTokens(user.id)
    const cookies = this.authService.getCookies(tokens)
    cookies.forEach((cookie) => {
      req.res?.cookie(cookie.name, cookie.value, cookie.options)
    })

    return user
  }
}
