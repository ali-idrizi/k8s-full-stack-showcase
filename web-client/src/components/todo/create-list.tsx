import { LabelInput } from '@/components'
import { useBrandColors } from '@/hooks'
import {
  Button,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { MutableRefObject, useRef } from 'react'
import FocusLock from 'react-focus-lock'
import { FiPlus } from 'react-icons/fi'

type FormProps = {
  onCancel: () => void
  firstFieldRef: MutableRefObject<HTMLInputElement | null>
}

const Form: React.FC<FormProps> = ({ onCancel, firstFieldRef }) => {
  const { secondary, secondaryScheme } = useBrandColors()
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values))
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <LabelInput
        id="title"
        label="New List Title"
        type="text"
        ref={firstFieldRef}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        focusBorderColor={secondary}
      />

      <ButtonGroup display="flex" justifyContent="flex-end" mt={5}>
        <Button variant="ghost" colorScheme="red" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isDisabled={!formik.isValid} colorScheme={secondaryScheme}>
          Create
        </Button>
      </ButtonGroup>
    </form>
  )
}

export const CreateTodoList: React.FC = () => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = useRef<HTMLInputElement>(null)

  return (
    <Popover
      isLazy
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      closeOnBlur={false}
      initialFocusRef={firstFieldRef}
      placement="bottom"
      arrowSize={10}
    >
      <PopoverTrigger>
        <IconButton
          ml="auto"
          aria-label="Create a New List"
          variant="ghost"
          rounded="full"
          title="Create a New List"
          icon={<FiPlus />}
        />
      </PopoverTrigger>

      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Form onCancel={onClose} firstFieldRef={firstFieldRef} />
        </FocusLock>
      </PopoverContent>
    </Popover>
  )
}
