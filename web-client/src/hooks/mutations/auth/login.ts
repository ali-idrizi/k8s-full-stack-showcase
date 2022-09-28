import { UserApi } from '@/api'
import { LoginPayload, LoginResponse } from '@/api/user/login'
import { WithAuth } from '@/hocs'
import { QUERY_KEY } from '@/utils/constants'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useLoginMutation = (): UseMutationResult<LoginResponse, unknown, LoginPayload> => {
  const queryClient = useQueryClient()

  return useMutation(UserApi.login, {
    onSuccess: (data) => {
      queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
        userId: data.id,
        needsRefresh: false,
      })
    },
  })
}
