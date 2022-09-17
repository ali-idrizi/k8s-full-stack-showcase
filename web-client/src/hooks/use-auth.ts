import { WithAuth } from '@/hocs'
import { useQueryClient } from '@tanstack/react-query'

export const useAuth = (): WithAuth => {
  const queryClient = useQueryClient()

  return (
    queryClient.getQueryData<WithAuth>(['auth']) ?? {
      userId: null,
      needsRefresh: false,
    }
  )
}
