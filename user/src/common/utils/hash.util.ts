import * as bcrypt from 'bcrypt'

const SALT_ROUNDS = 12

export const HashUtil = {
  isValid(plainPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash)
  },

  hash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, SALT_ROUNDS)
  },

  hashSync(plainPassword: string): string {
    return bcrypt.hashSync(plainPassword, SALT_ROUNDS)
  },
}
