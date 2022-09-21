import { GradientButtonProps } from '@/theme/components/button'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/button'
import { ComponentWithAs } from '@chakra-ui/react'

export const Button = ChakraButton as ComponentWithAs<'button', ButtonProps & GradientButtonProps>
