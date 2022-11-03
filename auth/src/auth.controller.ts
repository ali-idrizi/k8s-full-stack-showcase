import { Controller } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'
import { COMMAND } from './auth.constant'
import { Tokens, ValidateJwtRes } from './auth.interface'
import { AuthService } from './auth.service'
import { GenTokensDto } from './dto/gen-tokens.dto'
import { RefreshJwtDto } from './dto/refresh-jwt.dto'
import { RemoveRefreshTokenDto } from './dto/remove-refresh-token.dto'
import { ValidateJwtDto } from './dto/validate-jwt.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: COMMAND.genTokens })
  genTokens(@Payload() payload: GenTokensDto): Promise<Tokens> {
    return this.authService.genTokens(payload)
  }

  @MessagePattern({ cmd: COMMAND.validateJwt })
  validateJwt(@Payload() payload: ValidateJwtDto): ValidateJwtRes {
    return this.authService.validateJwt(payload)
  }

  @MessagePattern({ cmd: COMMAND.refreshJwt })
  refreshJwt(@Payload() payload: RefreshJwtDto): Promise<Tokens> {
    return this.authService.refreshJwt(payload)
  }

  @EventPattern({ cmd: COMMAND.removeRefreshToken })
  removeRefreshToken(@Payload() payload: RemoveRefreshTokenDto): Promise<void> {
    return this.authService.removeRefreshToken(payload.refreshToken)
  }
}
