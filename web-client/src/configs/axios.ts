import { AxiosRequestConfig } from 'axios'

export const axiosConfig: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}
