import { IsDefined } from 'class-validator'

export class RemoveRefreshTokenDto {
  @IsDefined({
    message: 'refreshToken is required',
  })
  refreshToken: string
}
