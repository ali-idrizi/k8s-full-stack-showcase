import { useBrandColors } from '@/hooks'
import { Button, HStack } from '@chakra-ui/react'
import Link from 'next/link'

export const DesktopNav: React.FC = () => {
  const { primaryScheme } = useBrandColors()

  return (
    <HStack spacing={6} display={['none', null, 'block']}>
      <Link href="/login" passHref>
        <Button as="a" variant="ghost" colorScheme={primaryScheme} borderRadius="full" px="6">
          Login
        </Button>
      </Link>

      <Link href="/register" passHref>
        <Button as="a" variant="solid" colorScheme={primaryScheme} borderRadius="full" px="6">
          Register
        </Button>
      </Link>
    </HStack>
  )
}
