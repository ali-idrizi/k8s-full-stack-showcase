import { UserClient } from '@/api'

export type RefreshTokenResponse = {
  userId: string
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const res = await UserClient.post<RefreshTokenResponse>('/auth/refresh-token')

  return res.data
}
