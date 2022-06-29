import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IEnvironment, ITokenPair } from './app.interface'
import { generateJwtToken, generateRefreshToken } from './utils/token'

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService<IEnvironment>) {}

  /**
   * Generates a JWT/refresh-token pair for a user
   *
   * @param {string} userId the user ID field to be add to the JWT payload as `uid`
   * @returns {ITokenPair} an object containing the JWT and the refresh-token
   */
  generateTokenPair(userId: string): ITokenPair {
    const jwtExpiresIn = this.configService.get('JWT_EXPIRES_IN_SECONDS', { infer: true })

    if (!jwtExpiresIn) {
      throw new InternalServerErrorException()
    }

    return {
      jwt: generateJwtToken(userId, jwtExpiresIn),
      refreshToken: generateRefreshToken(),
    }
  }
}
