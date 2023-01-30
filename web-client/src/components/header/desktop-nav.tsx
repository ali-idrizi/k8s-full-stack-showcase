import { useBrandColors } from '@/hooks'
import { Button, HStack } from '@chakra-ui/react'
import Link from 'next/link'

export const DesktopNav: React.FC = () => {
  const { primaryScheme } = useBrandColors()

  return (
    <HStack spacing={6} display={['none', null, 'block']}>
      <Button
        as={Link}
        href="/login"
        variant="ghost"
        colorScheme={primaryScheme}
        borderRadius="full"
        px="6"
      >
        Login
      </Button>

      <Button
        as={Link}
        href="/register"
        variant="solid"
        colorScheme={primaryScheme}
        borderRadius="full"
        px="6"
      >
        Register
      </Button>
    </HStack>
  )
}
