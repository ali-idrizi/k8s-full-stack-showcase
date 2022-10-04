import { UserClient } from '@/api'

export const logout = async (): Promise<void> => {
  await UserClient.post('/logout')
}
