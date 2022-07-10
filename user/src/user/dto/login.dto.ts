import { Transform, Type } from 'class-transformer'
import { IsDefined, IsEmail } from 'class-validator'

export class LoginDto {
  @IsDefined({
    message: 'Email is required',
  })
  @IsEmail(undefined, {
    message: 'Invalid email address',
  })
  @Type(() => String)
  @Transform(({ value }) => value.trim())
  @Transform(({ value }) => value.toLowerCase())
  email: string

  @IsDefined({
    message: 'Password is required',
  })
  @Type(() => String)
  password: string
}
