import { QUERY_KEY } from '@/utils/constants'
import { GsspHoc, WithReactQueryData } from '.'

export type WithAuth = {
  userId: string | null
  hasAuthTokens: boolean
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
  const hasAuthTokens = ctx.req?.headers['x-authenticated'] === 'true'

  queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], { userId, hasAuthTokens })

  return {
    props: {},
    data: {
      auth: {
        userId,
        hasAuthTokens,
        isLoggedIn: userId !== null,
      },
    },
  }
}
