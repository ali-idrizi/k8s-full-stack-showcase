import { Button, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

type NavItemProps = React.PropsWithChildren<{
  href: string
}>

const NavItem: React.FC<NavItemProps> = ({ href, children }) => {
  return (
    <Link href={href} passHref>
      <Button as="a" display="flex" textAlign="start" variant="ghost" py={6} borderRadius="none">
        {children}
      </Button>
    </Link>
  )
}

export const MobileNav: React.FC = () => {
  return (
    <Stack role="navigation" py={2} spacing={0} display={{ md: 'none' }}>
      <NavItem href="/login">Login</NavItem>
      <NavItem href="/register">Register</NavItem>
    </Stack>
  )
}
