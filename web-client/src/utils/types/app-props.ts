import { WithReactQueryProps } from '@/hocs'
import { ColorMode } from '@chakra-ui/react'
import { PageWithLayout } from './page-with-layout'

type Props<P = unknown> = {
  pageProps: P
  Component: PageWithLayout
}

export type AppProps = Props<WithReactQueryProps & { ssrColorMode: ColorMode }>
