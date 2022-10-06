import { axiosConfig } from '@/configs'
import { isDev } from '@/utils/env'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiError } from './error'

export class ApiClient {
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
    return this.handleRequest(() => this.axios.get(url))
  }

  post<T = unknown, R = AxiosResponse<T, unknown>, D = unknown>(url: string, data?: D): Promise<R> {
    return this.handleRequest(() => this.axios.post(url, data))
  }

  put<T = unknown, R = AxiosResponse<T, unknown>, D = unknown>(url: string, data?: D): Promise<R> {
    return this.handleRequest(() => this.axios.put(url, data))
  }

  delete<T = unknown, R = AxiosResponse<T, unknown>>(url: string): Promise<R> {
    return this.handleRequest(() => this.axios.delete(url))
  }

  private async handleRequest<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn()
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError(error)
      } else {
        if (isDev()) console.error(error)

        throw new ApiError(new AxiosError('Unexpected Error!'))
      }
    }
  }
}
