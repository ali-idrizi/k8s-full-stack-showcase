import { IsDefined } from 'class-validator'

export class GenerateTokenPairDto {
  @IsDefined({
    message: 'userId is required',
  })
  userId: string
}
