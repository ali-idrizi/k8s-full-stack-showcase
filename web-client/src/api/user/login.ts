import { UserClient } from '@/api'

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  id: string
  name: string
  email: string
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await UserClient.post<LoginResponse>('/login', payload)

  return res.data
}
