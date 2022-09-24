import { extendTheme } from '@chakra-ui/react'
import { ThemeConfig } from '@chakra-ui/theme'
import Button from './components/button'

const config: ThemeConfig = {
  cssVarPrefix: 'ck',
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const fontSizes = {
  md: '1.05rem',
}

export default extendTheme({
  colors,
  config,
  components: {
    Button,
  },
  fontSizes,
})