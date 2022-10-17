import { IsNotEmpty, IsString } from 'class-validator'
import { IsOptional } from 'src/common/decorators/is-optional.decorator'
import { Transform } from 'class-transformer'

export abstract class UpdateDto {
  @IsOptional()
  @IsNotEmpty({
    message: 'Title cannot be empty',
  })
  @IsString({
    message: 'Title must be a string',
  })
  @Transform(({ value }) => (value as string).trim())
  title: string
}
