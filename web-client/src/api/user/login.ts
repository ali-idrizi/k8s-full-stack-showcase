import { axios } from '@/api'

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
  const res = await axios.post<LoginResponse>('/user/login', payload)

  return res.data
}
