import { IsDefined } from 'class-validator'

export class ValidateJwtDto {
  @IsDefined({
    message: 'jwt is required',
  })
  jwt: string
}
