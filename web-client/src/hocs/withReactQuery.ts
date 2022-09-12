import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query'
import { compose, GsspHoc } from '.'

export type WithReactQueryData = {
  queryClient: QueryClient
}

export type WithReactQueryProps = {
  dehydratedState?: DehydratedState
}

export const withReactQueryHoc: GsspHoc<WithReactQueryData, WithReactQueryProps> = () => {
  const queryClient = new QueryClient()

  return {
    data: {
      queryClient,
    },
    props: () => ({
      dehydratedState: dehydrate(queryClient),
    }),
  }
}

export const withReactQuery = compose(withReactQueryHoc)
