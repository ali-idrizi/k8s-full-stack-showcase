import { BadRequestException } from '@nestjs/common'

export class JwtInvalidException extends BadRequestException {
  constructor(objectOrError?: string | object | unknown, description?: string) {
    super(objectOrError, description)
  }
}
