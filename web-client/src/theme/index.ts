import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { components } from './components'
import { foundations } from './foundations'

const config: ThemeConfig = {
  cssVarPrefix: 'ck',
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export default extendTheme({
  ...foundations,
  components,
  config,
})
