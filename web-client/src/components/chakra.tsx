import theme from '@/theme'
import { ChakraProvider } from '@chakra-ui/provider'
import React from 'react'

export const Chakra: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
