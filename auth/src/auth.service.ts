import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RpcException } from '@nestjs/microservices'
import { PrismaService } from 'nestjs-prisma'
import { IEnvironment, ITokenPair } from './auth.interface'
import { TokenUtil } from './common/utils/token.util'
import { GenerateTokenPairDto } from './dto/generate-token-pair.dto'

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService<IEnvironment>, private prisma: PrismaService) {}

  async generateTokenPair(payload: GenerateTokenPairDto): Promise<ITokenPair> {
    const jwtExpiresIn = this.configService.get('JWT_EXPIRES_IN_SECONDS', { infer: true })
    const jwtSecret = this.configService.get('JWT_SECRET', { infer: true })

    if (!jwtExpiresIn || !jwtSecret) {
      throw new RpcException('Environment variables missing')
    }

    const jwt = TokenUtil.generateJwtToken(payload.userId, parseInt(jwtExpiresIn), jwtSecret)
    const refreshToken = TokenUtil.generateRefreshToken()

    await this.prisma.auth.create({
      data: {
        refreshToken,
        userId: payload.userId,
      },
    })

    return { jwt, refreshToken }
  }
}
