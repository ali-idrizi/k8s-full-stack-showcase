import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { LogoutDto } from './logout.dto'
import { Response } from './logout.interface'
import { LogoutService } from './logout.service'

@Controller('logout')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  logout(@Body() logoutDto: LogoutDto): Response {
    return this.logoutService.logout(logoutDto)
  }
}
