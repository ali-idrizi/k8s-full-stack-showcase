import { ButtonProps } from '@chakra-ui/button'
import { defineStyle, tokenToCSSVar } from '@chakra-ui/styled-system'
import { ComponentStyleConfig } from '@chakra-ui/theme'
import { mode } from '@chakra-ui/theme-tools'

// Using kebab-case instead of camelCase since "React does not recognize the prop on a DOM element"
// is thrown. Chakra seems to be passing unknown props down the DOM element
export type GradientButtonProps = {
  gradientFrom?: ButtonProps['borderColor']
  gradientTo?: ButtonProps['borderColor']
}

const gradient = defineStyle(({ colorScheme, theme, ...props }) => {
  const gradientFrom = tokenToCSSVar('colors', props.gradientFrom)(theme)
  const gradientTo = tokenToCSSVar('colors', props.gradientTo)(theme)
  const borderWidth = props.borderWidth

  return {
    bgClip: 'padding-box !important',
    border: `solid ${borderWidth} transparent`,
    color: mode(`${colorScheme}.600`, `${colorScheme}.200`)(props),
    _after: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      borderRadius: 'inherit',
      m: '-' + borderWidth,
      bg: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
    },
    _hover: {
      bg: mode(`${colorScheme}.100`, `${colorScheme}.700`)(props),
    },
    _active: {
      bg: mode(`${colorScheme}.200`, `${colorScheme}.600`)(props),
    },
    _loading: {
      bg: mode(`${colorScheme}.100`, `${colorScheme}.700`)(props),
    },
  }
})

const buttonTheme: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'normal',
  },
  variants: {
    gradient,
  },
  defaultProps: {
    bgColor: 'blue.800',
    gradientFrom: 'green.800',
    gradientTo: 'blue.800',
    borderWidth: '2px',
  } as GradientButtonProps & Record<string, unknown>,
}

export default buttonTheme
