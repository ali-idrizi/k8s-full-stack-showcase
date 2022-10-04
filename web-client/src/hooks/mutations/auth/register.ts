import { ApiError, UserApi } from '@/api'
import { RegisterPayload, RegisterResponse } from '@/api/user/register'
import { WithAuth } from '@/hocs'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useRegisterMutation = (): UseMutationResult<
  RegisterResponse,
  ApiError,
  RegisterPayload
> => {
  const queryClient = useQueryClient()

  return useMutation([MUTATION_KEY.REGISTER], UserApi.register, {
    onSuccess: (data) => {
      queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
        userId: data.id,
        needsRefresh: false,
      })
    },
  })
}
