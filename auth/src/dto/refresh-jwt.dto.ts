import { IsDefined } from 'class-validator'
import { GenerateTokenPairDto } from './generate-token-pair.dto'

export class RefreshJwtDto extends GenerateTokenPairDto {
  @IsDefined({
    message: 'refreshToken is required',
  })
  refreshToken: string
}
