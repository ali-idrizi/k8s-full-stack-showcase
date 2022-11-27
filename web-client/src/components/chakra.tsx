import theme from '@/theme'
import { ChakraProvider, cookieStorageManagerSSR } from '@chakra-ui/react'

type Props = {
  cookies: string
}

export const Chakra: React.FC<React.PropsWithChildren<Props>> = ({ cookies, children }) => {
  return (
    <ChakraProvider theme={theme} colorModeManager={cookieStorageManagerSSR(cookies)}>
      {children}
    </ChakraProvider>
  )
}
