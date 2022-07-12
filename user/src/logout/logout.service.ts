import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { LogoutDto } from './logout.dto'
import { Response } from './logout.interface'

@Injectable()
export class LogoutService {
  constructor(private authService: AuthService) {}

  async logout(logoutDto: LogoutDto): Promise<Response> {
    await this.authService.removeRefreshToken(logoutDto.refreshToken)

    return {
      success: true,
    }
  }
}
