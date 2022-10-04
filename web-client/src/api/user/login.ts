import { UserClient } from '@/api'
import { InferType, object, string } from 'yup'

export const LoginSchema = object({
  email: string().email('Invalid email address').required('Email is required'),
  password: string().required('Password is required'),
})

export type LoginPayload = InferType<typeof LoginSchema>

export type LoginResponse = {
  id: string
  name: string
  email: string
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await UserClient.post<LoginResponse>('/login', payload)

  return res.data
}
