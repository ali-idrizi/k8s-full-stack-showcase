import { UserApi } from '@/api'
import { RefreshTokenResponse } from '@/api/user/refresh-token'
import { WithAuth } from '@/hocs'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useRefreshTokenMutation = (): UseMutationResult<RefreshTokenResponse> => {
  const queryClient = useQueryClient()

  return useMutation([MUTATION_KEY.REFRESH_TOKEN], UserApi.refreshToken, {
    onSuccess: (data) => {
      queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
        userId: data.userId,
        needsRefresh: false,
      })
    },
  })
}
