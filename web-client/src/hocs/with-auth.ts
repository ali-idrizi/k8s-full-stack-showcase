import { QUERY_KEY } from '@/utils/constants'
import { GsspHoc, WithReactQueryData } from '.'

export type WithAuth = {
  userId: string | null
  needsRefresh: boolean
}

export const withAuth: GsspHoc<unknown, unknown, WithReactQueryData> = ({ queryClient }, ctx) => {
  const userId = (ctx.req?.headers['x-user-id'] as string | undefined) ?? null
  const needsRefresh = !userId && ctx.req?.headers['x-authenticated'] === 'true'

  queryClient.setQueryData<WithAuth>([QUERY_KEY.AUTH], { userId, needsRefresh })

  return {
    props: {},
  }
}
