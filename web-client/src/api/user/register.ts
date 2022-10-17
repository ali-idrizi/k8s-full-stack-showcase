import { InferType, object, ref, string } from 'yup'

export const RegisterSchema = object({
  name: string()
    .required('Name is required')
    .min(3, (params) => `Name must be at least ${params.min} characters`),
  email: string().required('Email is required').email('Invalid email address'),
  password: string().required('Password is required').min(8, 'Your password is too short'),
  confirmPassword: string()
    .required('Please retype your password')
    .oneOf([ref('password')], 'Your password does not match'),
})

export type RegisterPayload = InferType<typeof RegisterSchema>

export type RegisterResponse = {
  id: string
  name: string
  email: string
}
