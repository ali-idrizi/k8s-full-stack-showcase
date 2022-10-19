import { QUERY_KEY } from '@/utils/constants'
import { GsspHoc, WithReactQueryData } from '.'

export type WithAuth = {
  userId: string | null
  shouldRefreshToken: boolean
}

export type WithAuthData = {
  auth: WithAuth & {
    isLoggedIn: boolean
  }
}

export const withAuth: GsspHoc<WithAuthData, unknown, WithReactQueryData> = (
  { queryClient },
  ctx,
) => {
  const userId = (ctx.req?.headers['x-user-id'] as string | undefined) ?? null
  const shouldRefreshToken = !userId && ctx.req?.headers['x-authenticated'] === 'true'

  const auth = { userId, shouldRefreshToken }

  queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], auth)

  return {
    props: {},
    data: {
      auth: {
        ...auth,
        isLoggedIn: userId !== null || shouldRefreshToken,
      },
    },
  }
}
