import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RpcException } from '@nestjs/microservices'
import * as JWT from 'jsonwebtoken'
import { PrismaService } from 'nestjs-prisma'
import { IEnvironment, ITokenPair, ValidateJwtRes } from './auth.interface'
import { JwtStatus, TokenUtil } from './common/utils/token.util'
import { GenerateTokenPairDto } from './dto/generate-token-pair.dto'
import { ValidateJwtDto } from './dto/validate-jwt.dto'

@Injectable()
export class AuthService {
  jwtSecret: string
  jwtExpiresIn: number

  constructor(private configService: ConfigService<IEnvironment>, private prisma: PrismaService) {
    const jwtSecret = this.configService.get('JWT_SECRET', { infer: true })
    const jwtExpiresIn = this.configService.get('JWT_EXPIRES_IN_SECONDS', { infer: true })

    if (!jwtSecret || !jwtExpiresIn) {
      throw new RpcException('Environment variables missing')
    }

    this.jwtSecret = jwtSecret
    this.jwtExpiresIn = parseInt(jwtExpiresIn)
  }

  async generateTokenPair(payload: GenerateTokenPairDto): Promise<ITokenPair> {
    const jwt = TokenUtil.generateJwt(payload.userId, this.jwtExpiresIn, this.jwtSecret)
    const refreshToken = TokenUtil.generateRefreshToken()

    await this.prisma.auth.create({
      data: {
        refreshToken,
        userId: payload.userId,
      },
    })

    return { jwt, refreshToken }
  }

  validateJwt(payload: ValidateJwtDto): ValidateJwtRes {
    const jwtStatus = TokenUtil.verfiyJwt(payload.jwt, this.jwtSecret)

    const expired = jwtStatus === JwtStatus.EXPIRED
    let jwtPayload: JWT.JwtPayload

    if (jwtStatus === JwtStatus.VALID || expired) {
      jwtPayload = TokenUtil.decodeJwt(payload.jwt)
    } else {
      throw new RpcException('Invalid JWT')
    }

    return {
      expired,
      payload: jwtPayload,
    }
  }
}
