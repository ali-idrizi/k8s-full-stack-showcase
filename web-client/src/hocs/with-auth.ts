import { QUERY_KEY } from '@/utils/constants'
import { GsspHoc, WithReactQueryData } from '.'

export type WithAuth = {
  userId: string | null
  needsRefresh: boolean
}

export type WithAuthData = {
  auth: WithAuth
}

export const withAuth: GsspHoc<WithAuthData, unknown, WithReactQueryData> = (
  { queryClient },
  ctx,
) => {
  const userId = (ctx.req?.headers['x-user-id'] as string | undefined) ?? null
  const needsRefresh = !userId && ctx.req?.headers['x-authenticated'] === 'true'

  const auth = { userId, needsRefresh }

  queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], auth)

  return {
    props: {},
    data: { auth },
  }
}
