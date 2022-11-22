import theme from '@/theme'
import { ColorModeScript } from '@chakra-ui/react'
import { Head, Html, Main, NextScript } from 'next/document'

const Document: React.FC = () => {
  return (
    <Html lang="en">
      <Head>
        {/* eslint-disable-next-line */}
        <title>Todo App</title>
        <meta
          name="description"
          content="A full-stack monorepo showcase todo app running on Kubernetes"
        />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
