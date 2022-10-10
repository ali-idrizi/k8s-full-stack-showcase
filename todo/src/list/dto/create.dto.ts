import { Transform } from 'class-transformer'
import { IsDefined, IsNotEmpty } from 'class-validator'

export abstract class CreateDto {
  @IsDefined({
    message: 'Title is required',
  })
  @IsNotEmpty({
    message: 'Title cannot be empty',
  })
  @Transform(({ value }) => (value as string).trim())
  title: string
}
