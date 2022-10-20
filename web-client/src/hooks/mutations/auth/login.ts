import { ApiError } from '@/api'
import { LoginPayload, LoginResponse } from '@/api/user/login'
import { WithAuth } from '@/hocs'
import { useApi } from '@/hooks'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useLoginMutation = (): UseMutationResult<LoginResponse, ApiError, LoginPayload> => {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation([MUTATION_KEY.LOGIN], api.user.login, {
    onSuccess: (data) => {
      queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
        userId: data.id,
        shouldRefreshToken: false,
      })
    },
  })
}
