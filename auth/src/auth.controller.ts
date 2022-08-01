import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ITokenPair } from './auth.interface'
import { AuthService } from './auth.service'
import { GenerateTokenPairDto } from './dto/generate-token-pair.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'generateTokenPair' })
  generateTokenPair(@Payload() payload: GenerateTokenPairDto): Promise<ITokenPair> {
    return this.authService.generateTokenPair(payload)
  }
}
