import theme from '@/theme'
import { ColorMode } from '@chakra-ui/react'

const COLOR_MODE_COOKIE = 'chakra-ui-color-mode'

export type MaybeColorMode = ColorMode | undefined

export function getColorModeFromCookies(cookies?: string): ColorMode {
  const defaultColorMode = theme.config.initialColorMode as ColorMode

  if (!cookies) {
    return defaultColorMode
  }

  const match = cookies.match(new RegExp(`(^| )${COLOR_MODE_COOKIE}=([^;]+)`))
  const colorMode = match?.[2] as MaybeColorMode

  if (colorMode === 'light' || colorMode === 'dark') {
    return colorMode
  }

  return defaultColorMode
}
