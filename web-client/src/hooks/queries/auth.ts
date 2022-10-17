import { WithAuth } from '@/hocs'
import { QUERY_KEY } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'

export type UseAuthQuery = WithAuth & {
  isLoggedIn: boolean
}

export const useAuthQuery = (): UseAuthQuery => {
  const { data } = useQuery<WithAuth>([QUERY_KEY.AUTH], {
    initialData: {
      userId: null,
      needsRefresh: false,
    },
  })

  const isLoggedIn = data.userId !== null || data.needsRefresh

  return {
    isLoggedIn,
    ...data,
  }
}
