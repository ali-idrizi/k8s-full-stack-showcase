import { Type } from 'class-transformer'
import { IsDefined } from 'class-validator'
import { Match } from 'src/common/decorators/match.decorator'
import { LoginDto } from 'src/login/login.dto'

export class RegisterDto extends LoginDto {
  @IsDefined({
    message: 'Confirm Password is required',
  })
  @Type(() => String)
  @Match('password', {
    message: 'Confirm Password does not match',
  })
  confirmPassword: string
}
