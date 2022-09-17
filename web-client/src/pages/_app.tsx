import { Auth, Chakra, Header, ReactQuery } from '@/components'
import type { WithReactQueryProps } from '@/hocs'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import type { AppProps as NextAppProps } from 'next/app'

type AppProps<P = unknown> = {
  pageProps: P
} & Omit<NextAppProps<P>, 'pageProps'>
type Props = AppProps<WithReactQueryProps>

const App: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <ReactQuery dehydratedState={pageProps.dehydratedState}>
      <Chakra>
        <SkipNavLink id="main">Skip to content</SkipNavLink>
        <Header />
        <SkipNavContent as="main" id="main">
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </SkipNavContent>
      </Chakra>
    </ReactQuery>
  )
}

export default App
