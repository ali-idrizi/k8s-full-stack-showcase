import { IsDefined } from 'class-validator'

export class GenTokensDto {
  @IsDefined({
    message: 'userId is required',
  })
  userId: string
}
