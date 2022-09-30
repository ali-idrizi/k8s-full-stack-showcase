import { axios } from '@/api'

export type RefreshTokenResponse = {
  userId: string
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const res = await axios.post<RefreshTokenResponse>('/user/auth/refresh-token')

  return res.data
}
