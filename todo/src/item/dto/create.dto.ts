import { Transform, Type } from 'class-transformer'
import { IsDefined, IsNotEmpty, MaxLength } from 'class-validator'

export abstract class CreateDto {
  @IsDefined({
    message: 'Title is required',
  })
  @IsNotEmpty({
    message: 'Title cannot be empty',
  })
  @Type(() => String)
  @Transform(({ value }) => (value as string).trim())
  @MaxLength(190, { message: 'Title is too long' })
  title: string

  @IsDefined({
    message: 'List ID is required',
  })
  @Type(() => String)
  listId: string
}
