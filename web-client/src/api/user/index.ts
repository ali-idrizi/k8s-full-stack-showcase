import { ApiClient } from '@/api/client'
import { isServer } from '@/utils/env'
import { AxiosRequestConfig } from 'axios'
import { LoginPayload, LoginResponse } from './login'
import { RefreshTokenResponse } from './refresh-token'
import { RegisterPayload, RegisterResponse } from './register'

export class UserApi {
  private client: ApiClient

  constructor(config?: AxiosRequestConfig) {
    this.client = new ApiClient({
      baseURL: isServer() ? 'http://app-user' : '/api/user',
      ...config,
    })
  }

  login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const res = await this.client.post<LoginResponse>('/login', payload)

    return res.data
  }

  logout = async (): Promise<void> => {
    await this.client.post('/logout')
  }

  refreshToken = async (): Promise<RefreshTokenResponse> => {
    const res = await this.client.post<RefreshTokenResponse>('/auth/refresh-token')

    return res.data
  }

  register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const res = await this.client.post<RegisterResponse>('/register', payload)

    return res.data
  }
}
