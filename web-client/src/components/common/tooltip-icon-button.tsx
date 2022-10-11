import { IconButton, IconButtonProps } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { forwardRef } from 'react'

const Tooltip = dynamic(() => import('@chakra-ui/tooltip').then((chakra) => chakra.Tooltip))

export const TooltipIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 'aria-label': ariaLabel, ...rest }, ref) => {
    return (
      <Tooltip hasArrow label={ariaLabel} closeOnClick={false} mt="2">
        <IconButton ref={ref} variant="ghost" rounded="full" aria-label={ariaLabel} {...rest} />
      </Tooltip>
    )
  },
)

TooltipIconButton.displayName = 'TooltipIconButton'
