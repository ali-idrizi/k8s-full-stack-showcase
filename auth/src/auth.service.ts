import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RpcException } from '@nestjs/microservices'
import { IEnvironment, ITokenPair } from './auth.interface'
import { TokenUtil } from './common/utils/token.util'
import { GenerateTokenPairDto } from './dto/generate-token-pair.dto'

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService<IEnvironment>) {}

  generateTokenPair(payload: GenerateTokenPairDto): ITokenPair {
    const jwtExpiresIn = this.configService.get('JWT_EXPIRES_IN_SECONDS', { infer: true })
    const jwtSecret = this.configService.get('JWT_SECRET', { infer: true })

    if (!jwtExpiresIn || !jwtSecret) {
      throw new RpcException('Environment variables missing')
    }

    return {
      jwt: TokenUtil.generateJwtToken(payload.userId, jwtExpiresIn, jwtSecret),
      refreshToken: TokenUtil.generateRefreshToken(),
    }
  }
}
