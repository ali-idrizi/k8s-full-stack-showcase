import { GradientHeading } from '@/components'
import { useAuth, useBrandColors } from '@/hooks'
import { Icon, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FiCheckCircle } from 'react-icons/fi'

export const Logo: React.FC = () => {
  const { primary } = useBrandColors()
  const { isLoggedIn } = useAuth()

  return (
    <Link
      as={NextLink}
      href={isLoggedIn ? '/dashboard' : '/'}
      data-testid="logo"
      _hover={{ textDecoration: 'none' }}
      display="flex"
      gap="2"
      userSelect="none"
      alignItems="center"
    >
      <Icon as={FiCheckCircle} w={[5, null, 7]} h={[5, null, 7]} color={primary} />

      <GradientHeading
        as="span"
        lineHeight="1"
        fontSize={['lg', null, 'xl']}
        fontWeight="extrabold"
      >
        TODO
      </GradientHeading>
    </Link>
  )
}
