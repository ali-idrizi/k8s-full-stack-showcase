import { IconButton, IconButtonProps } from '@chakra-ui/button'
import dynamic from 'next/dynamic'

const Tooltip = dynamic(() => import('@chakra-ui/tooltip').then((chakra) => chakra.Tooltip))

export const HeaderIconButton: React.FC<IconButtonProps> = ({
  'aria-label': ariaLabel,
  ...rest
}) => {
  return (
    <Tooltip label={ariaLabel}>
      <IconButton variant="ghost" borderRadius="full" aria-label={ariaLabel} {...rest} />
    </Tooltip>
  )
}
