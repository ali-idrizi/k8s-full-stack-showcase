import { ApiClient, ApiClientConfig } from '@/api/client'
import { isServer } from '@/utils/env'
import { AxiosResponse } from 'axios'
import { LoginPayload, LoginResponse } from './login'
import { RefreshTokenResponse } from './refresh-token'
import { RegisterPayload, RegisterResponse } from './register'

export class UserApi {
  private client: ApiClient

  private refreshTokenPromise: Promise<AxiosResponse<RefreshTokenResponse>> | null = null

  constructor(config?: ApiClientConfig) {
    this.client = new ApiClient({
      baseURL: isServer() ? 'http://app-user' : '/api/user',
      ...config,
      // Always disable refreshing the token for UserApi calls
      withRefreshTokenInterceptor: false,
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
    this.refreshTokenPromise =
      this.refreshTokenPromise ?? this.client.post<RefreshTokenResponse>('/auth/refresh-token')
    const res = await this.refreshTokenPromise
    this.refreshTokenPromise = null
    return res.data
  }

  register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const res = await this.client.post<RegisterResponse>('/register', payload)

    return res.data
  }
}
