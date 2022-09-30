import { WithReactQueryProps } from '@/hocs'
import { PageWithLayout } from './page-with-layout'

type Props<P = unknown> = {
  pageProps: P
  Component: PageWithLayout
}

export type AppProps = Props<WithReactQueryProps>
