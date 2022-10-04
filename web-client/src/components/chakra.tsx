import theme from '@/theme'
import { ChakraProvider } from '@chakra-ui/react'

export const Chakra: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
