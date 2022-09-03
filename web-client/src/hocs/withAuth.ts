import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

type CommonAuthData = {
  userId: string | null
}

type IncomingGetServerSideProp<P> = (
  ctx: GetServerSidePropsContext,
  data: CommonAuthData,
) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>

type AuthProps = { auth: { userId: string | null; needsRefresh: boolean } }

export type WithAuth<T = unknown> = T & AuthProps

export default function withAuth<T = unknown>(incomingGSSP: IncomingGetServerSideProp<T>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<WithAuth<T>>> => {
    const userId = (ctx.req?.headers['x-user-id'] as string | undefined) ?? null
    const needsRefresh = !userId && ctx.req?.headers['x-authenticated'] === 'true'

    const gsspResult = await incomingGSSP(ctx, { userId })

    if (!('props' in gsspResult)) {
      return gsspResult
    }

    const props = await Promise.resolve(gsspResult.props)

    return {
      props: {
        ...props,
        auth: { userId, needsRefresh },
      },
    }
  }
}
