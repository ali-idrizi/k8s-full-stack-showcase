import { Button, Stack } from '@chakra-ui/react'
import Link from 'next/link'

type NavItemProps = React.PropsWithChildren<{
  href: string
}>

const NavItem: React.FC<NavItemProps> = ({ href, children }) => {
  return (
    <Button
      as={Link}
      href={href}
      display="flex"
      textAlign="start"
      variant="ghost"
      py="6"
      borderRadius="none"
    >
      {children}
    </Button>
  )
}

export const MobileNav: React.FC = () => {
  return (
    <Stack id="mobile-nav" as="nav" py="2" spacing="0" display={{ md: 'none' }}>
      <NavItem href="/login">Login</NavItem>
      <NavItem href="/register">Register</NavItem>
    </Stack>
  )
}
