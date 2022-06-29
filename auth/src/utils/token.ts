import * as crypto from 'crypto'
import * as JWT from 'jsonwebtoken'

/**
 * Generate a signed JWT for a user
 *
 * @param {string} userId the user ID field to be add to the payload as `uid`
 * @param {number} expiresIn the expiration time of the generated JWT in seconds
 * @param {string} secret the secret used to sign the JWT
 *
 * @returns {string} a signed JWT
 */
export function generateJwtToken(userId: string, expiresIn: number, secret: string): string {
  const jwtPayload = {
    uid: userId,
  }

  return JWT.sign(jwtPayload, secret, {
    expiresIn,
  })
}

/**
 * Generate a random token
 *
 * @returns A random token generated using `crypto`
 */
export function generateRefreshToken(): string {
  return crypto.randomBytes(64).toString('base64url')
}
