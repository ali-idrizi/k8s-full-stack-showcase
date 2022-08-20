import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RpcException } from '@nestjs/microservices'
import * as JWT from 'jsonwebtoken'
import { PrismaService } from 'nestjs-prisma'
import { Environment } from './auth.constant'
import { TokenPair, ValidateJwtRes } from './auth.interface'
import { ConfigUtil } from './common/utils/config.util'
import { DateUtil } from './common/utils/date.util'
import { ErrorUtil } from './common/utils/error.util'
import { JwtStatus, TokenUtil } from './common/utils/token.util'
import { GenerateTokenPairDto } from './dto/generate-token-pair.dto'
import { RefreshJwtDto } from './dto/refresh-jwt.dto'
import { ValidateJwtDto } from './dto/validate-jwt.dto'

@Injectable()
export class AuthService {
  private jwtSecret: string
  private jwtExpiresIn: number
  private refreshTokenExpiresIn: number

  constructor(private prisma: PrismaService, configService: ConfigService) {
    const [jwtSecret, jwtExpiresIn, refreshTokenExpiresIn] = ConfigUtil.getMultiple(configService, [
      Environment.JWT_SECRET,
      Environment.JWT_EXPIRES_IN_SECONDS,
      Environment.REFRESH_TOKEN_EXPIRES_IN_SECONDS,
    ])

    this.jwtSecret = jwtSecret
    this.jwtExpiresIn = parseInt(jwtExpiresIn)
    this.refreshTokenExpiresIn = parseInt(refreshTokenExpiresIn)
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
      const auth = await this.prisma.auth.delete({ where: { refreshToken: payload.refreshToken } })

      const isExpired = DateUtil.isMoreThanSecondsAgo(auth.createdAt, this.refreshTokenExpiresIn)
      if (isExpired) {
        throw new RpcException('Refresh token is expired')
      }
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
