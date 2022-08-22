import { UserDto } from 'src/user.dto'
import { Tokens } from 'src/user.interface'

export interface Response {
  readonly user: Partial<UserDto>
  readonly tokens: Tokens
}
