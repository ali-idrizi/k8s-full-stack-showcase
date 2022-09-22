import { Auth, Chakra, Header, ReactQuery } from '@/components'
import Footer from '@/components/footer'
import type { WithReactQueryProps } from '@/hocs'
import { Flex } from '@chakra-ui/react'
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
        <Flex flexDir="column" minH="100vh">
          <Header />
          <SkipNavContent as="main" id="main" flexGrow="1">
            <Auth>
              <Component {...pageProps} />
            </Auth>
          </SkipNavContent>
        </Flex>
        <Footer />
      </Chakra>
    </ReactQuery>
  )
}

export default App
