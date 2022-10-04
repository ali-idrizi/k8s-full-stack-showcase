import { ApiClient } from '@/api/client'
import { login } from './login'
import { logout } from './logout'
import { refreshToken } from './refresh-token'

export const UserClient = new ApiClient({
  baseURL: '/api/user',
})

export const UserApi = {
  login,
  logout,
  refreshToken,
}
