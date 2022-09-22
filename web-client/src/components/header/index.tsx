import Container from '@/components/container'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { Icon } from '@chakra-ui/icon'
import { Box, HStack } from '@chakra-ui/layout'
import { IconButton, useDisclosure } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FiGithub, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { DesktopNav } from './desktop-nav'
import { HeaderIconButton } from './icon-button'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'

const Collapse = dynamic(() => import('@chakra-ui/transition').then((chakra) => chakra.Collapse))

export const Header: React.FC = () => {
  const router = useRouter()
  const { toggleColorMode } = useColorMode()
  const {
    isOpen: isMobileMenuOpen,
    onToggle: toggleMobileMenu,
    onClose: closeMobileMenu,
  } = useDisclosure()

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
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      boxShadow="sm"
    >
      <Container justifyContent="space-between" py={[5, null, 7]}>
        <Logo />

        <HStack spacing={[4, null, 6]}>
          <HeaderIconButton icon={<Icon as={FiGithub} />} aria-label="View GitHub Repo" />
          <HeaderIconButton
            onClick={toggleColorMode}
            icon={<Icon as={useColorModeValue(FiMoon, FiSun)} />}
            aria-label={`Switch to ${useColorModeValue('Dark', 'Light')} Mode`}
          />

          <DesktopNav />

          <IconButton
            variant="ghost"
            rounded="full"
            icon={<Icon as={isMobileMenuOpen ? FiX : FiMenu} />}
            aria-label={'Toggle Navigation'}
            display={['flex', null, 'none']}
            onClick={toggleMobileMenu}
          />
        </HStack>
      </Container>

      <Collapse in={isMobileMenuOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}
