import { Type } from 'class-transformer'
import { IsDefined, MinLength } from 'class-validator'
import { Match } from 'src/common/decorators/match.decorator'
import { LoginDto } from 'src/login/login.dto'

export class RegisterDto extends LoginDto {
  @MinLength(8, {
    message: 'Password must be at least 8 characters',
  })
  override password: string

  @IsDefined({
    message: 'Confirm Password is required',
  })
  @Match('password', {
    message: 'Confirm Password does not match',
  })
  @Type(() => String)
  confirmPassword: string
}
