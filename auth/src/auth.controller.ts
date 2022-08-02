import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ITokenPair, RemoveRefreshTokenRes, ValidateJwtRes } from './auth.interface'
import { AuthService } from './auth.service'
import { GenerateTokenPairDto } from './dto/generate-token-pair.dto'
import { RefreshJwtDto } from './dto/refresh-jwt.dto'
import { RemoveRefreshTokenDto } from './dto/remove-refresh-token.dto'
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

  @MessagePattern({ cmd: 'refreshJwt' })
  async refreshJwt(@Payload() payload: RefreshJwtDto): Promise<ITokenPair> {
    await this.authService.removeRefreshToken(payload.refreshToken)
    return this.authService.generateTokenPair({ userId: payload.userId })
  }

  @MessagePattern({ cmd: 'removeRefreshToken' })
  removeRefreshToken(@Payload() payload: RemoveRefreshTokenDto): Promise<RemoveRefreshTokenRes> {
    return this.authService.removeRefreshToken(payload.refreshToken)
  }
}
