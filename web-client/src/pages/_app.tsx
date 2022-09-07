import reactQueryConfig from '@/configs/react-query-config'
import type { WithAuth } from '@/hocs/withAuth'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps as NextAppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import '@/styles/global.css'

type AppProps<P = unknown> = {
  pageProps: P
} & Omit<NextAppProps<P>, 'pageProps'>

type Props = WithAuth<{
  dehydratedState: unknown
}>

const MyApp: React.FC<AppProps<Props>> = ({ Component, pageProps }) => {
  const router = useRouter()
  const [queryClient] = useState(() => new QueryClient(reactQueryConfig))

  useEffect(() => {
    const refreshToken = async (): Promise<void> => {
      try {
        await fetch('/api/user/auth/refresh-token', {
          method: 'post',
        })
      } catch (e) {
        console.error('Failed to refresh the access token')
      }
    }

    // Refresh the access token if a GSSP requested it
    if (pageProps.auth?.needsRefresh) {
      refreshToken()
        .then(() => {
          // Replace the route with the current path, this will make another call to GSSP
          router.replace(router.asPath)
        })
        .catch(() => {
          // TODO: refresh token failed, logout and redirect to /login
          router.push('/404')
        })
    }
  }, [router, pageProps])

  if (pageProps.auth?.needsRefresh) {
    return <noscript>Authentication failed</noscript>
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
