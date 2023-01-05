import theme from '@/theme'
import { getColorModeCookie } from '@/utils/color-mode'
import { ChakraProvider, cookieStorageManagerSSR } from '@chakra-ui/react'

type Props = {
  cookies?: string
}

export const Chakra: React.FC<React.PropsWithChildren<Props>> = ({ cookies, children }) => {
  const documentCookies = typeof document !== 'undefined' ? document.cookie : null

  return (
    <ChakraProvider
      theme={theme}
      colorModeManager={cookieStorageManagerSSR(documentCookies ?? cookies ?? getColorModeCookie())}
    >
      {children}
    </ChakraProvider>
  )
}
