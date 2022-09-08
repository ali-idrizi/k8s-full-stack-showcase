import { GsspHoc } from '.'

type WithAuthData = {
  userId: string | null
}

export type AuthProps = { auth: { userId: string | null; needsRefresh: boolean } }

export const withAuth: GsspHoc<WithAuthData, AuthProps> = (next) => {
  return async (ctx) => {
    const userId = (ctx.req?.headers['x-user-id'] as string | undefined) ?? null
    const needsRefresh = !userId && ctx.req?.headers['x-authenticated'] === 'true'

    const result = await Promise.resolve(next(ctx, { userId }))

    if (!('props' in result)) {
      return result
    }

    const props = await Promise.resolve(result.props)

    return {
      props: {
        ...props,
        auth: { userId, needsRefresh },
      },
    }
  }
}
