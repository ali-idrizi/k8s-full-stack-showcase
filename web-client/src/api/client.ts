import { axiosConfig } from '@/configs'
import axios, { Axios, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiError } from './error'

interface ApiClientImpl {
  get: Axios['get']
  post: Axios['post']
  put: Axios['put']
  delete: Axios['delete']
}

export class ApiClient implements ApiClientImpl {
  private axiosClient: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.axiosClient = axios.create({
      ...axiosConfig,
      ...config,
    })
  }

  get axios(): AxiosInstance {
    return this.axiosClient
  }

  get<T = unknown, R = AxiosResponse<T, unknown>>(url: string): Promise<R> {
    return this.withErrorHandler(() => this.axios.get(url))
  }

  post<T = unknown, R = AxiosResponse<T, unknown>, D = unknown>(url: string, data?: D): Promise<R> {
    return this.withErrorHandler(() => this.axios.post(url, data))
  }

  put<T = unknown, R = AxiosResponse<T, unknown>, D = unknown>(url: string, data?: D): Promise<R> {
    return this.withErrorHandler(() => this.axios.put(url, data))
  }

  delete<T = unknown, R = AxiosResponse<T, unknown>>(url: string): Promise<R> {
    return this.withErrorHandler(() => this.axios.delete(url))
  }

  private async withErrorHandler<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn()
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError(error)
      } else {
        throw new ApiError(new AxiosError('Unexpected Error!'))
      }
    }
  }
}
