import { BadRequestException } from '@nestjs/common'

export class ItemNotFoundException extends BadRequestException {
  constructor(objectOrError: string | object = 'Item not found', description?: string) {
    super(objectOrError, description)
  }
}
