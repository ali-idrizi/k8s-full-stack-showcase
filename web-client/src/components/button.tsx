import { GradientButtonProps } from '@/theme/components/button'
import { Button as ChakraButton } from '@chakra-ui/button'
import { chakra } from '@chakra-ui/system'

export const Button = chakra<typeof ChakraButton, GradientButtonProps>(ChakraButton)
