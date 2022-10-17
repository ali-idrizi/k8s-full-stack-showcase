import { API, ApiError } from '@/api'
import { LoginPayload, LoginResponse } from '@/api/user/login'
import { WithAuth } from '@/hocs'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useLoginMutation = (): UseMutationResult<LoginResponse, ApiError, LoginPayload> => {
  const queryClient = useQueryClient()

  return useMutation([MUTATION_KEY.LOGIN], API.user.login, {
    onSuccess: (data) => {
      queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
        userId: data.id,
        needsRefresh: false,
      })
    },
  })
}
