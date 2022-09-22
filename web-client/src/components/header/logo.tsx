import { Icon, Link, Text, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FiCheckCircle } from 'react-icons/fi'

export const Logo: React.FC = () => {
  const colorFrom = useColorModeValue('green.600', 'green.200')
  const colorTo = useColorModeValue('blue.600', 'blue.200')

  return (
    <NextLink href="/" passHref>
      <Link
        data-testid="logo"
        _hover={{ textDecoration: 'none' }}
        display="flex"
        gap={2}
        userSelect="none"
        alignItems="center"
      >
        <Icon as={FiCheckCircle} w={[5, null, 7]} h={[5, null, 7]} color={colorFrom} />
        <Text
          as="span"
          lineHeight="1"
          bgGradient={`linear(to-r, ${colorFrom}, ${colorTo})`}
          bgClip="text"
          fontSize={['lg', null, 'xl']}
          fontWeight="extrabold"
        >
          TODO
        </Text>
      </Link>
    </NextLink>
  )
}
