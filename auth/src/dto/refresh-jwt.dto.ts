import { IsDefined } from 'class-validator'
import { GenTokensDto } from './gen-tokens.dto'

export class RefreshJwtDto extends GenTokensDto {
  @IsDefined({
    message: 'refreshToken is required',
  })
  refreshToken: string
}
