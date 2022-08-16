import { Type } from 'class-transformer'
import { IsDefined, IsNotEmpty } from 'class-validator'

export abstract class CreateDto {
  @IsDefined({
    message: 'Title is required',
  })
  @IsNotEmpty({
    message: 'Title cannot be empty',
  })
  @Type(() => String)
  title: string

  @IsDefined({
    message: 'List ID is required',
  })
  @Type(() => String)
  listId: string
}
