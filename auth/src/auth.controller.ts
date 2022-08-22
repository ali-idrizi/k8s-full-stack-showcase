import { Controller } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'
import { Command } from './auth.constant'
import { TokenPair, ValidateJwtRes } from './auth.interface'
import { AuthService } from './auth.service'
import { GenerateTokenPairDto } from './dto/generate-token-pair.dto'
import { RefreshJwtDto } from './dto/refresh-jwt.dto'
import { RemoveRefreshTokenDto } from './dto/remove-refresh-token.dto'
import { ValidateJwtDto } from './dto/validate-jwt.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: Command.GEN_TOKENS })
  generateTokenPair(@Payload() payload: GenerateTokenPairDto): Promise<TokenPair> {
    return this.authService.generateTokenPair(payload)
  }

  @MessagePattern({ cmd: Command.VALIDATE_JWT })
  validateJwt(@Payload() payload: ValidateJwtDto): ValidateJwtRes {
    return this.authService.validateJwt(payload)
  }

  @MessagePattern({ cmd: Command.REFRESH_JWT })
  refreshJwt(@Payload() payload: RefreshJwtDto): Promise<TokenPair> {
    return this.authService.refreshJwt(payload)
  }

  @EventPattern({ cmd: Command.REMOVE_REFRESH_TOKEN })
  removeRefreshToken(@Payload() payload: RemoveRefreshTokenDto): Promise<void> {
    return this.authService.removeRefreshToken(payload.refreshToken)
  }
}
