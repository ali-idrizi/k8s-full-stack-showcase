import { reactQueryConfig } from '@/configs'
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

type ReactQueryProps = {
  dehydratedState?: DehydratedState
}

export const ReactQuery: React.FC<React.PropsWithChildren<ReactQueryProps>> = ({
  dehydratedState,
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient(reactQueryConfig))

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  )
}
