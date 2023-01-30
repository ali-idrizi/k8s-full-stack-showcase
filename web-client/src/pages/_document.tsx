import { getColorModeFromCookies } from '@/utils/color-mode'
import { ColorMode } from '@chakra-ui/react'
import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

type InitialProps = {
  colorMode: ColorMode
}

class Document extends NextDocument<InitialProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & InitialProps> {
    const { renderPage, req } = ctx
    const colorMode = getColorModeFromCookies(req?.headers.cookie)

    ctx.renderPage = () =>
      renderPage({
        enhanceApp: (App) => (props) =>
          <App {...props} pageProps={{ ...props.pageProps, ssrColorMode: colorMode }} />,
      })

    const initialProps = await NextDocument.getInitialProps(ctx)

    return {
      ...initialProps,
      colorMode,
    }
  }

  render(): JSX.Element {
    const { colorMode } = this.props

    return (
      <Html data-theme={colorMode} lang="en" style={{ colorScheme: colorMode }}>
        <Head />
        <body className={`chakra-ui-${colorMode}`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
