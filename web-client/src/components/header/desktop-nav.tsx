import { Button } from '@/components'
import { useBrandColors } from '@/hooks'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { HStack } from '@chakra-ui/layout'
import Link from 'next/link'

export const DesktopNav: React.FC = () => {
  const textColor = useColorModeValue('grey.700', 'gray.200')
  const { primary, secondary } = useBrandColors()

  const registerButtonProps = {
    color: textColor,
    bgColor: useColorModeValue('white', 'gray.800'),
    gradientFrom: primary,
    gradientTo: secondary,
  }

  return (
    <HStack spacing={6} display={['none', null, 'block']}>
      <Link href="/login" passHref>
        <Button as="a" variant="solid" borderRadius="full" color={textColor} px={6} py={5}>
          Login
        </Button>
      </Link>

      <Link href="/register" passHref>
        <Button
          as="a"
          variant="gradient"
          px={6}
          py={5}
          borderRadius="full"
          borderWidth="2px"
          {...registerButtonProps}
        >
          Register
        </Button>
      </Link>
    </HStack>
  )
}
