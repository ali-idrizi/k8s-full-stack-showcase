import theme from '@/theme'
import { ColorMode } from '@chakra-ui/react'

const COLOR_MODE_COOKIE = 'chakra-ui-color-mode'

type MaybeColorMode = ColorMode | undefined

export function getColorModeFromCookies(cookies: string | undefined): ColorMode {
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

export function getColorModeCookie(cookies: string | undefined): string {
  const colorMode = getColorModeFromCookies(cookies)
  return colorMode ? `${COLOR_MODE_COOKIE}=${colorMode}` : ''
}
