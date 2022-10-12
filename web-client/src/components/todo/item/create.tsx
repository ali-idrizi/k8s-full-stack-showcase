import { CreateTodoItemSchema } from '@/api/todo/item'
import { useBrandColors } from '@/hooks'
import { useCreateItemMutation } from '@/hooks/mutations/todo/item/create'
import { TodoList } from '@/utils/types'
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  VisuallyHidden,
} from '@chakra-ui/react'
import { useFormik } from 'formik'

type Props = {
  list: TodoList
}

export const CreateTodoItem: React.FC<Props> = ({ list }) => {
  const { mutate, isLoading, error: mutationError } = useCreateItemMutation()
  const { secondary, secondaryScheme } = useBrandColors()

  const formik = useFormik({
    initialValues: {
      title: '',
      listId: list.id,
    },
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          formik.setFieldValue('title', '', true)
        },
      })
    },
    validationSchema: CreateTodoItemSchema,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl isInvalid={!!formik.errors.title && formik.touched.title}>
        <InputGroup size="md">
          <Input
            id="title"
            name="title"
            type="text"
            variant="flushed"
            aria-label="Please enter your task"
            placeholder="What do you want to do today?"
            onChange={formik.handleChange}
            onKeyDown={(e) => formik.setFieldTouched(e.currentTarget.name)}
            value={formik.values.title}
            focusBorderColor={secondary}
            _invalid={{
              borderColor: undefined,
            }}
          />
          <InputRightElement>
            <Button
              variant="ghost"
              size="sm"
              type="submit"
              isLoading={isLoading}
              isDisabled={!formik.touched.title || !formik.isValid}
              colorScheme={secondaryScheme}
            >
              Add
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage as={VisuallyHidden}>
          {formik.errors.title || mutationError?.firstError}
        </FormErrorMessage>
      </FormControl>
    </form>
  )
}
