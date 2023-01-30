import { Button, ButtonProps } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'

type Props = {
  href: LinkProps['href']
  colorScheme: ButtonProps['colorScheme']
}

export const CTAButton: React.FC<React.PropsWithChildren<Props>> = ({ href, ...rest }) => {
  return (
    <Button
      as={Link}
      href={href}
      variant="solid"
      borderRadius="full"
      px="14"
      py="7"
      textTransform="uppercase"
      fontWeight="bold"
      fontSize={{ base: 'lg', md: 'xl' }}
      w={{ base: 'full', md: 52 }}
      maxW="80"
      {...rest}
    />
  )
}
