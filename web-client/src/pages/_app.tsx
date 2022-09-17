import { Auth } from '@/components/auth'
import { Chakra } from '@/components/chakra'
import { Header } from '@/components/header'
import reactQueryConfig from '@/configs/react-query-config'
import type { WithReactQueryProps } from '@/hocs'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps as NextAppProps } from 'next/app'
import { useState } from 'react'

type AppProps<P = unknown> = {
  pageProps: P
} & Omit<NextAppProps<P>, 'pageProps'>
type Props = AppProps<WithReactQueryProps>

const App: React.FC<Props> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient(reactQueryConfig))

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Auth>
          <Chakra>
            <SkipNavLink id="main">Skip to content</SkipNavLink>
            <Header />
            <SkipNavContent as="main" id="main">
              <Component {...pageProps} />
            </SkipNavContent>
          </Chakra>
        </Auth>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
