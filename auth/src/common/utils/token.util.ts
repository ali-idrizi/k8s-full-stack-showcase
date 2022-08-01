import * as crypto from 'crypto'
import * as JWT from 'jsonwebtoken'

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
}
