import { WithAuth } from '@/hocs'
import { useQueryClient } from '@tanstack/react-query'

export type UseAuth = WithAuth & {
  loggedIn: boolean
}

export const useAuth = (): UseAuth => {
  const queryClient = useQueryClient()

  const authData = queryClient.getQueryData<WithAuth>(['auth']) ?? {
    userId: null,
    needsRefresh: false,
  }

  const loggedIn = authData.userId !== null || authData.needsRefresh

  return {
    loggedIn,
    ...authData,
  }
}
