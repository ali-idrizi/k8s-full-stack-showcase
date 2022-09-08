import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query'
import { GsspHoc } from '.'

type WithReactQueryData = {
  queryClient: QueryClient
}

export type ReactQueryProps = {
  dehydratedState: DehydratedState
}

export const withReactQuery: GsspHoc<WithReactQueryData, ReactQueryProps> = (next) => {
  return async (ctx) => {
    const queryClient = new QueryClient()
    const result = await Promise.resolve(next(ctx, { queryClient }))

    if (!('props' in result)) {
      return result
    }

    const props = await Promise.resolve(result.props)

    return {
      props: {
        ...props,
        dehydratedState: dehydrate(queryClient),
      },
    }
  }
}
