import { IsDefined } from 'class-validator'

export class ValidateJwtDto {
  @IsDefined({
    message: 'JWT is required',
  })
  jwt: string
}
