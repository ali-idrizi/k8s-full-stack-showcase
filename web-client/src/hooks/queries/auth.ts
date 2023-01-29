import { WithAuth } from '@/hocs'
import { QUERY_KEY } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'

export type UseAuthQuery = {
  userId: string | null
  isLoggedIn: boolean
}

export const useAuth = (): UseAuthQuery => {
  const {
    data: { userId, hasAuthTokens },
  } = useQuery<WithAuth>([QUERY_KEY.AUTH], {
    initialData: {
      userId: null,
      hasAuthTokens: false,
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const isLoggedIn = userId !== null || hasAuthTokens

  return {
    userId,
    isLoggedIn,
  }
}
