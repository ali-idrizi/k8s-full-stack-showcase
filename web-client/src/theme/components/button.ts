import {
  Button,
  ButtonProps,
  chakra,
  ComponentStyleConfig,
  defineStyle,
  tokenToCSSVar,
} from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// Using kebab-case instead of camelCase since "React does not recognize the prop on a DOM element"
// is thrown. Chakra seems to be passing unknown props down the DOM element
type GradientButtonProps = {
  'gradient-from'?: ButtonProps['color']
  'gradient-to'?: ButtonProps['color']
  'gradient-border-width'?: ButtonProps['borderWidth']
}
export const GradientButton = chakra<typeof Button, GradientButtonProps>(Button)

const gradient = defineStyle(({ colorScheme, theme, ...props }) => {
  const gradientFrom = tokenToCSSVar('colors', props['gradient-from'])(theme)
  const gradientTo = tokenToCSSVar('colors', props['gradient-to'])(theme)
  const gradientBorderWidth = props['gradient-border-width']

  return {
    bgClip: 'padding-box !important',
    border: `solid ${gradientBorderWidth} transparent`,
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
      m: '-' + gradientBorderWidth,
      bg: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
    },
    _hover: {
      bg: mode(`${colorScheme}.100`, `${colorScheme}.700`)(props),
    },
    _active: {
      bg: mode(`${colorScheme}.200`, `${colorScheme}.600`)(props),
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
    'gradient-from': 'green.800',
    'gradient-to': 'blue.800',
    'gradient-border-width': '3px',
  } as GradientButtonProps & Record<string, unknown>,
}

export default buttonTheme
