import { ApiError, UserApi } from '@/api'
import { WithAuth } from '@/hocs'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export const useLogoutMutation = (): UseMutationResult<unknown, ApiError, unknown> => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation([MUTATION_KEY.LOGOUT], UserApi.logout, {
    onSuccess: () => {
      queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
        userId: null,
        shouldRefreshToken: false,
      })

      router.push('/login')
    },
  })
}
