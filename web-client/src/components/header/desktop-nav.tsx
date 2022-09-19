import { Button } from '@/components'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { HStack } from '@chakra-ui/layout'

export const DesktopNav: React.FC = () => {
  const textColor = useColorModeValue('grey.700', 'gray.200')

  const registerButtonProps = {
    color: textColor,
    bgColor: useColorModeValue('white', 'gray.800'),
    gradientFrom: useColorModeValue('green.600', 'green.200'),
    gradientTo: useColorModeValue('blue.600', 'blue.200'),
  }

  return (
    <HStack spacing={6} display={['none', null, 'block']}>
      <Button variant="solid" borderRadius="full" color={textColor} px={6} py={5}>
        Login
      </Button>
      <Button
        variant="gradient"
        px={6}
        py={5}
        borderRadius="full"
        borderWidth="2px"
        {...registerButtonProps}
      >
        Register
      </Button>
    </HStack>
  )
}
