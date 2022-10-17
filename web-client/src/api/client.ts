import { axiosConfig } from '@/configs'
import { isDev } from '@/utils/env'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API } from '.'
import { ApiError } from './error'

export type ApiClientConfig = AxiosRequestConfig & {
  withRefreshTokenInterceptor?: boolean

  _isRetry?: boolean
}

export class ApiClient {
  private axiosClient: AxiosInstance

  constructor(config?: ApiClientConfig) {
    this.axiosClient = axios.create({
      ...axiosConfig,
      ...config,
    })

    if (config?.withRefreshTokenInterceptor) {
      this.axios.interceptors.response.use(
        (res) => res,
        async (error: AxiosError) => {
          const req = error.config as ApiClientConfig

          if (error?.response?.status === 401 && !req._isRetry) {
            req._isRetry = true
            await API.user.refreshToken()
            return this.axios(req)
          }

          return Promise.reject(error)
        },
      )
    }
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

  patch<T = unknown, R = AxiosResponse<T, unknown>, D = unknown>(
    url: string,
    data?: D,
  ): Promise<R> {
    return this.handleRequest(() => this.axios.patch(url, data))
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
