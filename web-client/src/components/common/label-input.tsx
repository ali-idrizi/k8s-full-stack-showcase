import {
  As,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react'
import { useCallback } from 'react'

type Props = {
  id: string
  type: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<unknown>) => void
  onBlur?: (e: React.ChangeEvent<unknown>) => void
  iconAs?: As
  autoFocus?: boolean
  focusBorderColor?: string
}

export const LabelInput: React.FC<Props> = ({ id, label, autoFocus, iconAs, ...rest }) => {
  const autoFocusRef = useCallback((element: HTMLInputElement) => element?.focus(), [])
  const color = useColorModeValue('gray.400', 'gray.500')

  return (
    <>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputGroup>
        {iconAs && (
          <InputLeftElement pointerEvents="none">
            <Icon as={iconAs} color={color} />
          </InputLeftElement>
        )}
        <Input
          id={id}
          name={id}
          ref={autoFocus ? autoFocusRef : undefined}
          borderColor={color}
          variant="outline"
          {...rest}
        />
      </InputGroup>
    </>
  )
}
