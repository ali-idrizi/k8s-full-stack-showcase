import { ApiProvider, Chakra, Footer, Header, ReactQuery } from '@/components'
import { AppProps, PageWithLayout } from '@/utils/types'
import { Box, Flex } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Head from 'next/head'

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { dehydratedState, ssrColorMode, ...pageProps },
}) => {
  const getLayout: PageWithLayout['getLayout'] = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta
          name="description"
          content="A full-stack monorepo showcase todo app running on Kubernetes"
        />
      </Head>

      <ReactQuery dehydratedState={dehydratedState}>
        <Chakra ssrColorMode={ssrColorMode}>
          <SkipNavLink id="main">Skip to content</SkipNavLink>
          <Flex flexDir="column" minH="100vh">
            <Header />
            <SkipNavContent as="main" id="main" display="flex" flexDir="row" flexGrow="1">
              <Box w="full" minH="full">
                <ApiProvider>{getLayout(<Component {...pageProps} />)}</ApiProvider>
              </Box>
            </SkipNavContent>
          </Flex>
          <Footer />
        </Chakra>

        <ReactQueryDevtools />
      </ReactQuery>
    </>
  )
}

export default App
