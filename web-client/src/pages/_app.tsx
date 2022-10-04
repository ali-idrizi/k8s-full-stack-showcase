import { Auth, Chakra, Footer, Header, ReactQuery } from '@/components'
import { AppProps, PageWithLayout } from '@/utils/types'
import { Box, Flex } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App: React.FC<AppProps> = ({ Component, pageProps: { dehydratedState, ...pageProps } }) => {
  const getLayout: PageWithLayout['getLayout'] = Component.getLayout ?? ((page) => page)

  return (
    <ReactQuery dehydratedState={dehydratedState}>
      <Chakra>
        <SkipNavLink id="main">Skip to content</SkipNavLink>
        <Flex flexDir="column" minH="100vh">
          <Header />
          <SkipNavContent as="main" id="main" display="flex" flexDir="row" flexGrow="1">
            <Box w="full" minH="full">
              <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
            </Box>
          </SkipNavContent>
        </Flex>
        <Footer />
      </Chakra>

      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQuery>
  )
}

export default App
