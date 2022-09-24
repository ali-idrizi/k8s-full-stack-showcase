import { useColorModeValue } from '@chakra-ui/react'

type BrandColors = {
  primary: string
  secondary: string
  primaryScheme: string
  secondaryScheme: string
}

export const useBrandColors = (): BrandColors => {
  const primaryScheme = 'green'
  const secondaryScheme = 'teal'

  const primary = useColorModeValue(`${primaryScheme}.600`, `${primaryScheme}.200`)
  const secondary = useColorModeValue(`${secondaryScheme}.600`, `${secondaryScheme}.200`)

  return { primary, secondary, primaryScheme, secondaryScheme }
}
