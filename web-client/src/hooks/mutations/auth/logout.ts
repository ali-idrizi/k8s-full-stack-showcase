import { API, ApiError } from '@/api'
import { WithAuth } from '@/hocs'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useLogoutMutation = (): UseMutationResult<unknown, ApiError, unknown> => {
  const queryClient = useQueryClient()

  return useMutation([MUTATION_KEY.LOGOUT], API.user.logout, {
    onSuccess: () => {
      queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
        userId: null,
        needsRefresh: false,
      })
    },
  })
}
