import { ApiError } from '@/api'
import { Alert, AlertIcon, List, ListItem } from '@chakra-ui/react'

type ErrorAlertProps = {
  error: ApiError
}

const ErrorAlert: React.FC<Required<ErrorAlertProps>> = ({ error }) => {
  if (typeof error.data === 'string') {
    return (
      <Alert status="error">
        <AlertIcon />

        {error.data}
      </Alert>
    )
  }

  return (
    <Alert status="error">
      <AlertIcon />

      <List>
        {error.data.map((item, index) => {
          return <ListItem key={index}>{item}</ListItem>
        })}
      </List>
    </Alert>
  )
}

type ApiErrorAlertProps = {
  error: ApiError | null
}

export const ApiErrorAlert: React.FC<ApiErrorAlertProps> = ({ error }) => {
  if (!error) {
    return null
  }

  return <ErrorAlert error={error} />
}
