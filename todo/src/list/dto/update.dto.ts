import { IsNotEmpty, IsString } from 'class-validator'
import { IsOptional } from 'src/common/decorators/is-optional.decorator'

export abstract class UpdateDto {
  @IsOptional()
  @IsNotEmpty({
    message: 'Title cannot be empty',
  })
  @IsString({
    message: 'Title must be a string',
  })
  title: string
}
