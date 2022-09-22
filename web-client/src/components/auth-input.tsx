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
  iconAs: As
  onChange: (e: React.ChangeEvent<unknown>) => void
  value: string
  autoFocus?: boolean
}

export const AuthInput: React.FC<Props> = ({ id, label, autoFocus, iconAs, ...rest }) => {
  const autoFocusRef = useCallback((element: HTMLInputElement) => element?.focus(), [])

  return (
    <>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={iconAs} color={useColorModeValue('gray.600', 'gray.300')} />
        </InputLeftElement>
        <Input
          id={id}
          name={id}
          ref={autoFocus ? autoFocusRef : undefined}
          borderColor={useColorModeValue('gray.300', 'gray.600')}
          focusBorderColor="green.400"
          variant="outline"
          {...rest}
        />
      </InputGroup>
    </>
  )
}
