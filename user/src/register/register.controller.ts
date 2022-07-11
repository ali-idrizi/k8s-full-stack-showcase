import { Body, Controller, Post } from '@nestjs/common'
import { RegisterDto } from './register.dto'
import { IRegisterRes } from './register.interface'
import { RegisterService } from './register.service'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/')
  register(@Body() registerDto: RegisterDto): Promise<IRegisterRes> {
    return this.registerService.register(registerDto)
  }
}
