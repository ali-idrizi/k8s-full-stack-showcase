import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ITokenPair, ValidateJwtRes } from './auth.interface'
import { AuthService } from './auth.service'
import { GenerateTokenPairDto } from './dto/generate-token-pair.dto'
import { ValidateJwtDto } from './dto/validate-jwt.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'generateTokenPair' })
  generateTokenPair(@Payload() payload: GenerateTokenPairDto): Promise<ITokenPair> {
    return this.authService.generateTokenPair(payload)
  }

  @MessagePattern({ cmd: 'validateJwt' })
  validateJwt(@Payload() payload: ValidateJwtDto): ValidateJwtRes {
    return this.authService.validateJwt(payload)
  }
}
