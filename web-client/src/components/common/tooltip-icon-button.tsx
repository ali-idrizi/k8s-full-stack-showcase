import { forwardRef, IconButton, IconButtonProps } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const Tooltip = dynamic(() => import('@chakra-ui/tooltip').then((chakra) => chakra.Tooltip))

export const TooltipIconButton = forwardRef<IconButtonProps, 'button'>(
  ({ 'aria-label': ariaLabel, ...rest }, ref) => {
    return (
      <Tooltip hasArrow label={ariaLabel} closeOnClick={false} mt="2">
        <IconButton ref={ref} variant="ghost" rounded="full" aria-label={ariaLabel} {...rest} />
      </Tooltip>
    )
  },
)

TooltipIconButton.displayName = 'TooltipIconButton'
