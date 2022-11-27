import theme from '@/theme'
import { getColorModeCookie } from '@/utils/color-mode'
import { ChakraProvider, cookieStorageManagerSSR } from '@chakra-ui/react'

type Props = {
  cookies?: string
}

export const Chakra: React.FC<React.PropsWithChildren<Props>> = ({ cookies, children }) => {
  return (
    <ChakraProvider
      theme={theme}
      colorModeManager={cookieStorageManagerSSR(cookies ?? getColorModeCookie())}
    >
      {children}
    </ChakraProvider>
  )
}
