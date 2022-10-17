import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

export const EmptyTodoListAlert: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Alert status="info" rounded="md">
      <AlertIcon />
      {children}
    </Alert>
  )
}
