import { Button } from '@/components/button'
import { useColorModeValue } from '@chakra-ui/color-mode'

export const UserAction: React.FC = () => {
  const textColor = useColorModeValue('grey.700', 'gray.200')

  const registerButtonProps = {
    color: textColor,
    bgColor: useColorModeValue('white', 'gray.800'),
    gradientFrom: useColorModeValue('green.600', 'green.200'),
    gradientTo: useColorModeValue('blue.600', 'blue.200'),
  }

  return (
    <>
      <Button variant="solid" borderRadius="full" color={textColor} px={6} py={5}>
        Login
      </Button>
      <Button
        variant={'gradient'}
        px={6}
        py={5}
        borderRadius="full"
        borderWidth="2px"
        {...registerButtonProps}
      >
        Register
      </Button>
    </>
  )
}
