import { Transform, Type } from 'class-transformer'
import { IsDefined, IsEmail } from 'class-validator'

export abstract class AuthInputDto {
  @IsDefined({
    message: 'Email is required',
  })
  @IsEmail(undefined, {
    message: 'Invalid email address',
  })
  @Transform(({ value }) => value.trim())
  @Transform(({ value }) => value.toLowerCase())
  @Type(() => String)
  email: string

  @IsDefined({
    message: 'Password is required',
  })
  @Type(() => String)
  password: string
}
