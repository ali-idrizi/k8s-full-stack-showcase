import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { Icon } from '@chakra-ui/icon'
import { Box, Container, Flex } from '@chakra-ui/layout'
import { FiGithub, FiMoon, FiSun } from 'react-icons/fi'
import { HeaderIconButton } from './icon-button'
import { Logo } from './logo'
import { UserAction } from './user-action'

export const Header: React.FC = () => {
  const { toggleColorMode } = useColorMode()

  const ColorModeIcon = useColorModeValue(FiMoon, FiSun)
  const colorModeToggle = useColorModeValue('Dark', 'Light')
  const headerBorderColor = useColorModeValue('gray.200', 'gray.900')

  return (
    <Box
      as="header"
      borderBottom={1}
      borderStyle="solid"
      borderColor={headerBorderColor}
      boxShadow="sm"
    >
      <Container as={Flex} justifyContent="space-between" maxW="container.xl" py={7}>
        <Logo />
        <Flex alignItems="center" gap={4}>
          <HeaderIconButton icon={<Icon as={FiGithub} />} aria-label="View GitHub Repo" />
          <HeaderIconButton
            onClick={toggleColorMode}
            icon={<Icon as={ColorModeIcon} />}
            aria-label={`Switch to ${colorModeToggle} Mode`}
          />

          <UserAction />
        </Flex>
      </Container>
    </Box>
  )
}
