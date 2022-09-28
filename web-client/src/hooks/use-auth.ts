import { WithAuth } from '@/hocs'
import { QUERY_KEY } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'

export type UseAuth = WithAuth & {
  loggedIn: boolean
}

export const useAuth = (): UseAuth => {
  const { data } = useQuery<WithAuth>([QUERY_KEY.AUTH], {
    initialData: {
      userId: null,
      needsRefresh: false,
    },
  })

  const loggedIn = data.userId !== null || data.needsRefresh

  return {
    loggedIn,
    ...data,
  }
}
