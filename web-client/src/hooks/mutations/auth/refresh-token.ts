import { UserApi } from '@/api/user'
import { RefreshTokenResponse } from '@/api/user/refresh-token'
import { WithAuth } from '@/hocs'
import { MUTATION_KEY, QUERY_KEY } from '@/utils/constants'
import { useToast } from '@chakra-ui/react'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useLogoutMutation } from './logout'

export const useRefreshTokenMutation = (): UseMutationResult<RefreshTokenResponse> => {
  const { mutate: mutateLogout } = useLogoutMutation()
  const toast = useToast()
  const queryClient = useQueryClient()

  return useMutation([MUTATION_KEY.REFRESH_TOKEN], UserApi.refreshToken, {
    onSuccess: (data) => {
      queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], {
        userId: data.userId,
        needsRefresh: false,
      })
    },
    onError: () => {
      mutateLogout(null)
      toast({
        position: 'bottom-right',
        description: 'Authentication failed! Please login again.',
        status: 'error',
        isClosable: true,
        duration: 5000,
        variant: 'subtle',
      })
    },
    retry: false,
  })
}
