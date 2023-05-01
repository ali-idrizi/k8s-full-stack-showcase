import { ApiClient, ApiClientConfig } from '@/api/client'
import { isServer } from '@/utils/env'
import { LoginPayload, LoginResponse } from './login'
import { RefreshTokenResponse } from './refresh-token'
import { RegisterPayload, RegisterResponse } from './register'

export class UserApi {
  private client: ApiClient

  constructor(config?: ApiClientConfig) {
    this.client = UserApi.createClient(config)
  }

  private static createClient(config?: ApiClientConfig): ApiClient {
    return new ApiClient({
      baseURL: isServer() ? process.env.USER_SERVICE_URL : '/api/user',
      ...config,
    })
  }

  login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const res = await this.client.post<LoginResponse>('/login', payload)

    return res.data
  }

  register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const res = await this.client.post<RegisterResponse>('/register', payload)

    return res.data
  }

  static logout = async (): Promise<void> => {
    const client = UserApi.createClient()
    await client.post('/logout')
  }

  static refreshToken = async (): Promise<RefreshTokenResponse> => {
    const client = UserApi.createClient()
    const res = await client.post<RefreshTokenResponse>('/auth/refresh-token')

    return res.data
  }
}
