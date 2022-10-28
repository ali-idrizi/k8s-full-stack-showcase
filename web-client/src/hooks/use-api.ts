import { API } from '@/api'
import { ApiContext } from '@/components'
import { useContext } from 'react'

export const useApi = (): API => {
  const api = useContext(ApiContext)

  if (api === null) {
    throw new Error('ApiContext not found!')
  }

  return api
}
