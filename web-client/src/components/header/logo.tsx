import { useColorModeValue } from '@chakra-ui/color-mode'
import { Icon } from '@chakra-ui/icon'
import { HStack, Text } from '@chakra-ui/layout'
import { FiCheckCircle } from 'react-icons/fi'

export const Logo: React.FC = () => {
  const colorFrom = useColorModeValue('green.600', 'green.200')
  const colorTo = useColorModeValue('blue.600', 'blue.200')

  return (
    <HStack data-testid="logo" userSelect="none" spacing={2}>
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
    </HStack>
  )
}
