import { forwardRef, IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react'

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
