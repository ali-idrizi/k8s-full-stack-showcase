import { QueryClientConfig } from '@tanstack/react-query'

export const reactQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 60 * 1000,
      cacheTime: 5 * 60 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
  },
}
