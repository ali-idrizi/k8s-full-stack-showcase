import { User } from '@prisma/client'
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
}
