import { Injectable, InternalServerErrorException } from '@nestjs/common'
import * as JWT from 'jsonwebtoken'
import { IEnvironment, ITokenPair } from './app.interface'
import * as crypto from 'crypto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService<IEnvironment>) {}

  generateTokenPair(userId: string): ITokenPair {
    return {
      jwt: this.generateJwtToken(userId),
      refreshToken: this.generateRefreshToken(),
    }
  }

  private generateJwtToken(userId: string): string {
    const jwtExpiresIn = this.configService.get('JWT_EXPIRES_IN_SECONDS', { infer: true })

    if (jwtExpiresIn == null) {
      throw new InternalServerErrorException()
    }

    const jwtPayload = {
      uid: userId,
    }

    return JWT.sign(jwtPayload, 'secret', {
      expiresIn: jwtExpiresIn,
    })
  }

  private generateRefreshToken(): string {
    return crypto.randomBytes(64).toString('base64url')
  }
}
