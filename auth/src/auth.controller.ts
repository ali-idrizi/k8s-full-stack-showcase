import { Controller } from '@nestjs/common'
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices'
import { ITokenPair } from './auth.interface'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'generateTokenPair' })
  generateTokenPair(@Payload('userId') userId: string): ITokenPair {
    if (!userId) {
      throw new RpcException('userId is required')
    }

    return this.authService.generateTokenPair(userId)
  }
}
