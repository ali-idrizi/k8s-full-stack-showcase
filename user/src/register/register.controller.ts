import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { UserDto } from 'src/user.dto'
import { RegisterDto } from './register.dto'
import { RegisterService } from './register.service'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/')
  register(
    @Res({ passthrough: true }) res: Response,
    @Body() registerDto: RegisterDto,
  ): Promise<UserDto> {
    return this.registerService.register(res, registerDto)
  }
}
