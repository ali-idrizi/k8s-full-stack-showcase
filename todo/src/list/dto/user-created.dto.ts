import { IsDefined } from 'class-validator'

export class UserCreatedDto {
  @IsDefined({
    message: 'userId is required',
  })
  userId: string
}
