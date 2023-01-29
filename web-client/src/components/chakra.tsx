import theme from '@/theme'
import { MaybeColorMode } from '@/utils/color-mode'
import { isServer, isTest } from '@/utils/env'
import { ChakraProvider, ColorMode, cookieStorageManager } from '@chakra-ui/react'
import { useMemo } from 'react'

type Props = {
  ssrColorMode: ColorMode
}

const ssrStorageManager = (ssrColorMode: ColorMode) => ({
  type: 'cookie' as const,
  ssr: true,
  get: (): MaybeColorMode => {
    return isServer() || isTest() ? ssrColorMode : cookieStorageManager.get()
  },
  set: (value: ColorMode | 'system'): void => {
    cookieStorageManager.set(value)
  },
})

export const Chakra: React.FC<React.PropsWithChildren<Props>> = ({ children, ssrColorMode }) => {
  const colorModeManager = useMemo(() => ssrStorageManager(ssrColorMode), [ssrColorMode])

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  )
}
