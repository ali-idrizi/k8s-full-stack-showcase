import { IconButton, IconButtonProps } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const Tooltip = dynamic(() => import('@chakra-ui/tooltip').then((chakra) => chakra.Tooltip))

export const TooltipIconButton: React.FC<IconButtonProps> = ({
  'aria-label': ariaLabel,
  ...rest
}) => {
  return (
    <Tooltip label={ariaLabel}>
      <IconButton variant="ghost" rounded="full" aria-label={ariaLabel} {...rest} />
    </Tooltip>
  )
}
