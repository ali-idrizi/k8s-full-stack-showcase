import { UserDto } from './dto/user.dto'

export interface ITokenPair {
  readonly jwt: string
  readonly refreshToken: string
}

export interface ILoginRes {
  readonly user: Partial<UserDto>
  readonly tokens: ITokenPair
}
