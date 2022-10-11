import { Box } from '@chakra-ui/react'

export const HoverVisibleBox: React.FC<React.PropsWithChildren> = ({ children }) => {
  const hoverStyle = {
    visibility: 'visible',
    opacity: '1',
    transform: 'scale(1)',
  }

  return (
    <Box
      visibility="hidden"
      opacity="0"
      transform="scale(0.8)"
      transition=".2s all"
      _groupFocusWithin={hoverStyle}
      _groupHover={hoverStyle}
    >
      {children}
    </Box>
  )
}
