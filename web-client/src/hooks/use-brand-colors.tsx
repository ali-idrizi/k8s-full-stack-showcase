import { useColorModeValue } from '@chakra-ui/react'

export const useBrandColors = (): { primary: string; secondary: string } => {
  const primary = useColorModeValue('green.600', 'green.200')
  const secondary = useColorModeValue('blue.600', 'blue.200')

  return { primary, secondary }
}
