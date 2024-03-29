import { Container, TooltipIconButton } from '@/components'
import { useAuth } from '@/hooks'
import {
  Box,
  Collapse,
  HStack,
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FiGithub, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { AccountActionButton } from './account-action-button'
import { DesktopNav } from './desktop-nav'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'

export const Header: React.FC = () => {
  const router = useRouter()
  const { toggleColorMode } = useColorMode()
  const {
    isOpen: isMobileMenuOpen,
    onToggle: toggleMobileMenu,
    onClose: closeMobileMenu,
  } = useDisclosure()

  const { isLoggedIn } = useAuth()

  useEffect(() => {
    router.events.on('routeChangeStart', closeMobileMenu)

    return () => {
      router.events.off('routeChangeStart', closeMobileMenu)
    }
  }, [router, closeMobileMenu])

  return (
    <Box
      as="header"
      data-testid="header"
      borderBottom="1px"
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      boxShadow="sm"
    >
      <Container as="nav" display="flex" justifyContent="space-between" py={[5, null, 7]}>
        <Logo />

        <HStack spacing={[4, null, 6]}>
          <TooltipIconButton
            as="a"
            href={process.env.NEXT_PUBLIC_GITHUB_REPO}
            target="_blank"
            rel="noreferrer noopener"
            icon={<Icon as={FiGithub} />}
            aria-label="View GitHub Repo"
          />
          <TooltipIconButton
            onClick={toggleColorMode}
            icon={<Icon as={useColorModeValue(FiMoon, FiSun)} />}
            aria-label={`Switch to ${useColorModeValue('Dark', 'Light')} Mode`}
          />

          {isLoggedIn ? (
            <AccountActionButton />
          ) : (
            <>
              <DesktopNav />
              <IconButton
                variant="ghost"
                rounded="full"
                icon={<Icon as={isMobileMenuOpen ? FiX : FiMenu} />}
                aria-label={'Toggle Navigation'}
                aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
                aria-controls="mobile-nav"
                display={['flex', null, 'none']}
                onClick={toggleMobileMenu}
              />
            </>
          )}
        </HStack>
      </Container>

      {!isLoggedIn && (
        <Collapse in={isMobileMenuOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      )}
    </Box>
  )
}
