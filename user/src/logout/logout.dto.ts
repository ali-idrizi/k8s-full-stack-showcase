import { Type } from 'class-transformer'
import { IsDefined } from 'class-validator'

export abstract class LogoutDto {
  @IsDefined({
    message: 'Refresh token is required',
  })
  @Type(() => String)
  refreshToken: string
}
