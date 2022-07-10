import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'

export class UserDto implements User {
  id: string
  name: string
  email: string

  @Exclude({
    toPlainOnly: true,
  })
  password: string

  @Exclude({
    toPlainOnly: true,
  })
  createdAt: Date

  @Exclude({
    toPlainOnly: true,
  })
  updatedAt: Date

  isPasswordValid(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password)
  }
}
