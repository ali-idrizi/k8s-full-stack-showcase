import { AxiosRequestConfig } from 'axios'

export const axiosConfig: AxiosRequestConfig = {
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}
