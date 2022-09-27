import { Button, ButtonProps } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'

type Props = {
  href: LinkProps['href']
  colorScheme: ButtonProps['colorScheme']
}

export const CTAButton: React.FC<React.PropsWithChildren<Props>> = ({ href, ...rest }) => {
  return (
    <Link href={href} passHref>
      <Button
        as="a"
        variant="solid"
        borderRadius="full"
        px={14}
        py={7}
        fontSize="xl"
        textTransform="uppercase"
        fontWeight="bold"
        w={{ base: 'full', md: 52 }}
        {...rest}
      />
    </Link>
  )
}
