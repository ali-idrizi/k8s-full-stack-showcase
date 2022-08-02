import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RpcException } from '@nestjs/microservices'
import * as JWT from 'jsonwebtoken'
import { PrismaService } from 'nestjs-prisma'
import { Environment } from './auth.constant'
import { AuthEnvironment, TokenPair, ValidateJwtRes } from './auth.interface'
import { ErrorUtil } from './common/utils/error.util'
import { JwtStatus, TokenUtil } from './common/utils/token.util'
import { GenerateTokenPairDto } from './dto/generate-token-pair.dto'
import { RefreshJwtDto } from './dto/refresh-jwt.dto'
import { ValidateJwtDto } from './dto/validate-jwt.dto'

@Injectable()
export class AuthService {
  jwtSecret: string
  jwtExpiresIn: number

  constructor(
    private configService: ConfigService<AuthEnvironment>,
    private prisma: PrismaService,
  ) {
    const jwtSecret = this.configService.get(Environment.JWT_SECRET, { infer: true })
    const jwtExpiresIn = this.configService.get(Environment.JWT_EXPIRES_IN_SECONDS, { infer: true })

    if (!jwtSecret || !jwtExpiresIn) {
      throw new RpcException('Environment variables missing')
    }

    this.jwtSecret = jwtSecret
    this.jwtExpiresIn = parseInt(jwtExpiresIn)
  }

  async generateTokenPair(payload: GenerateTokenPairDto): Promise<TokenPair> {
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

  async refreshJwt(payload: RefreshJwtDto): Promise<TokenPair> {
    try {
      await this.prisma.auth.delete({ where: { refreshToken: payload.refreshToken } })
    } catch (error) {
      if (ErrorUtil.isNotFoundError(error)) {
        throw new RpcException('Invalid refresh token')
      }

      throw error
    }

    return this.generateTokenPair({ userId: payload.userId })
  }

  async removeRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.prisma.auth.delete({ where: { refreshToken } })
    } catch (error) {
      // don't throw when the refresh token does not exist in the database
      if (!ErrorUtil.isNotFoundError(error)) {
        throw error
      }
    }
  }
}
