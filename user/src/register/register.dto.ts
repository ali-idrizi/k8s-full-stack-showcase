import { Type } from 'class-transformer'
import { IsDefined, MinLength } from 'class-validator'
import { Match } from 'src/common/decorators/match.decorator'
import { AuthInputDto } from 'src/common/dto/auth-input.dto'

export class RegisterDto extends AuthInputDto {
  @IsDefined({
    message: 'Name is required',
  })
  @MinLength(3, {
    message: 'Name must be at least 3 characters',
  })
  @Type(() => String)
  name: string

  @MinLength(8, {
    message: 'Password must be at least 8 characters',
  })
  password: string

  @IsDefined({
    message: 'Confirm Password is required',
  })
  @Match('password', {
    message: 'Confirm Password does not match',
  })
  @Type(() => String)
  confirmPassword: string
}
