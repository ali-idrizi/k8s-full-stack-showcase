import { compose, GsspHoc } from '.'

export type WithAuth = {
  auth: {
    userId: string | null
    needsRefresh: boolean
  }
}

export const withAuthHoc: GsspHoc<WithAuth, WithAuth> = (ctx) => {
  const userId = (ctx.req?.headers['x-user-id'] as string | undefined) ?? null
  const needsRefresh = !userId && ctx.req?.headers['x-authenticated'] === 'true'

  const auth = { userId, needsRefresh }

  return {
    data: { auth },
    props: { auth },
  }
}

export const withAuth = compose(withAuthHoc)