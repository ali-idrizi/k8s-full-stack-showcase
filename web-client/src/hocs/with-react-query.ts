import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query'
import { GsspHoc } from '.'

export type WithReactQueryData = {
  queryClient: QueryClient
}

export type WithReactQueryProps = {
  dehydratedState?: DehydratedState
}

export const withReactQuery: GsspHoc<WithReactQueryData, WithReactQueryProps> = () => {
  const queryClient = new QueryClient()

  return {
    data: {
      queryClient,
    },
    props: () => {
      const dehydratedState = dehydrate(queryClient)
      queryClient.clear()
      return { dehydratedState }
    },
  }
}
