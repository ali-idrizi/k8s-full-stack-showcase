import { UserDto } from 'src/user.dto'
import { ITokenPair } from 'src/user.interface'

export interface ILoginRes {
  readonly user: Partial<UserDto>
  readonly tokens: ITokenPair
}
