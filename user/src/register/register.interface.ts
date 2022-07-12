import { UserDto } from 'src/user.dto'
import { TokenPair } from 'src/user.interface'

export interface Response {
  readonly user: Partial<UserDto>
  readonly tokens: TokenPair
}
