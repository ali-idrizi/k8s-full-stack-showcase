import { Body, Controller, Post } from '@nestjs/common'
import { RegisterDto } from './register.dto'
import { Response } from './register.interface'
import { RegisterService } from './register.service'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/')
  register(@Body() registerDto: RegisterDto): Promise<Response> {
    return this.registerService.register(registerDto)
  }
}
