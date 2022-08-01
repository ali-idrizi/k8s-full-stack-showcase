import * as crypto from 'crypto'
import * as JWT from 'jsonwebtoken'

export enum JwtStatus {
  VALID,
  EXPIRED,
  INVALID,
}

export const TokenUtil = {
  /**
   * Generate a signed JWT for a user
   *
   * @param userId the user ID field to be add to the payload as `uid`
   * @param expiresIn the expiration time of the generated JWT in seconds
   * @param secret the secret used to sign the JWT
   *
   * @returns a signed JWT
   */
  generateJwt: (userId: string, expiresIn: number, secret: string): string => {
    const jwtPayload = {
      uid: userId,
    }

    return JWT.sign(jwtPayload, secret, {
      expiresIn,
    })
  },

  /**
   * Generate a random token
   *
   * @returns A random token generated using `crypto`
   */
  generateRefreshToken: (): string => {
    return crypto.randomBytes(64).toString('base64url')
  },

  /**
   * Verify if JWT is valid and signed with the correct secret
   *
   * @param jwt the JWT to be verified
   * @param secret the secret used to sign the JWT
   *
   * @returns The JWT Status: VALID, EXPIRED or INVALID
   */
  verfiyJwt: (jwt: string, secret: string): JwtStatus => {
    try {
      JWT.verify(jwt, secret)
      return JwtStatus.VALID
    } catch (e) {
      if (e instanceof JWT.TokenExpiredError) {
        return JwtStatus.EXPIRED
      }

      return JwtStatus.INVALID
    }
  },

  /**
   * Decode a JWT and return the payload
   *
   * @param jwt the JWT to be decoded
   *
   * @returns The JWT payload
   */
  decodeJwt: (jwt: string): JWT.JwtPayload => {
    return JWT.decode(jwt) as JWT.JwtPayload
  },
}
