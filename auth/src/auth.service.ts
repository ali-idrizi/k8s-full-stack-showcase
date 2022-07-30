import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IEnvironment, ITokenPair } from './auth.interface'
import { TokenUtil } from './common/utils/token.util'

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService<IEnvironment>) {}

  /**
   * Generates a JWT/refresh-token pair for a user
   *
   * @param {string} userId the user ID field to be add to the JWT payload as `uid`
   * @returns {ITokenPair} an object containing the JWT and the refresh-token
   */
  generateTokenPair(userId: string): ITokenPair {
    const jwtExpiresIn = this.configService.get('JWT_EXPIRES_IN_SECONDS', { infer: true })
    const jwtSecret = this.configService.get('JWT_SECRET', { infer: true })

    if (!jwtExpiresIn || !jwtSecret) {
      throw new InternalServerErrorException()
    }

    return {
      jwt: TokenUtil.generateJwtToken(userId, jwtExpiresIn, jwtSecret),
      refreshToken: TokenUtil.generateRefreshToken(),
    }
  }
}
