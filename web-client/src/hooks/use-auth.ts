import { WithAuth } from '@/hocs'
import { QUERY_KEY } from '@/utils/constants'
import { useQueryClient } from '@tanstack/react-query'

export type UseAuth = WithAuth & {
  loggedIn: boolean
}

export const useAuth = (): UseAuth => {
  const queryClient = useQueryClient()

  const authData = queryClient.getQueryData<WithAuth>([QUERY_KEY.AUTH]) ?? {
    userId: null,
    needsRefresh: false,
  }

  const loggedIn = authData.userId !== null || authData.needsRefresh

  return {
    loggedIn,
    ...authData,
  }
}
