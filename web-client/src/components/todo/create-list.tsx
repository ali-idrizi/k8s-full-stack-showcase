import { CreateTodoListSchema } from '@/api/todo/list'
import { ApiErrorAlert, LabelInput } from '@/components'
import { useBrandColors, useCreateListMutation } from '@/hooks'
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { MutableRefObject, useRef } from 'react'
import FocusLock from 'react-focus-lock'
import { FiPlus } from 'react-icons/fi'

type FormProps = {
  onClose: () => void
  firstFieldRef: MutableRefObject<HTMLInputElement | null>
}

const Form: React.FC<FormProps> = ({ onClose, firstFieldRef }) => {
  const { mutate, error, isLoading } = useCreateListMutation()
  const { secondary, secondaryScheme } = useBrandColors()
  const router = useRouter()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (data) => {
          onClose()

          toast({
            position: 'bottom-right',
            description: `List ${data.title} has been created!`,
            status: 'success',
            isClosable: true,
            duration: 5000,
            variant: 'subtle',
          })

          router.push(`/dashboard/${data.id}`, undefined, { shallow: true })
        },
      })
    },
    validationSchema: CreateTodoListSchema,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl isInvalid={!!formik.errors.title && formik.touched.title}>
        <LabelInput
          id="title"
          label="New List Title"
          type="text"
          ref={firstFieldRef}
          onChange={formik.handleChange}
          value={formik.values.title}
          focusBorderColor={secondary}
        />

        <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
      </FormControl>

      <ApiErrorAlert mt="4" w="full" borderRadius="md" error={error} />

      <ButtonGroup display="flex" justifyContent="flex-end" mt={5}>
        <Button variant="ghost" colorScheme="red" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading} colorScheme={secondaryScheme}>
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
          <Form onClose={onClose} firstFieldRef={firstFieldRef} />
        </FocusLock>
      </PopoverContent>
    </Popover>
  )
}
