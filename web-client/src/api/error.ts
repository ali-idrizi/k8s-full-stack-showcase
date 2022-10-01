import { AxiosError } from 'axios'

type ApiErrorResponse = {
  error?: string
  message?: string | string[]
  statusCode?: number
}

export class ApiError extends Error {
  error: AxiosError<ApiErrorResponse>

  constructor(error: AxiosError<ApiErrorResponse>) {
    super(error.message, {
      cause: error,
    })

    this.error = error
  }

  get data(): string | string[] {
    const message = this.error.response?.data?.message

    return message ?? 'An unknown error occured. Please try again later!'
  }
}
