import { axiosConfig } from '@/configs'
import { isDev } from '@/utils/env'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiError } from './error'

export type ApiClientConfig = AxiosRequestConfig & {
  onRefreshToken?: () => Promise<boolean>
  onPreRequest?: () => Promise<boolean>
}

export class ApiClient {
  private axiosClient: AxiosInstance

  constructor(config?: ApiClientConfig) {
    this.axiosClient = axios.create({
      ...axiosConfig,
      ...config,
    })

    this.axios.interceptors.request.use(
      async (reqConfig) => {
        const shouldProceed = await (reqConfig as ApiClientConfig).onPreRequest?.()

        if (shouldProceed === false) {
          return Promise.reject(new AxiosError('Request Calcelled', '', reqConfig))
        }

        return reqConfig
      },
      (error) => Promise.reject(error),
    )

    this.axios.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        const reqConfig = error.config as ApiClientConfig

        if (reqConfig.onRefreshToken !== undefined && error?.response?.status === 401) {
          const shouldRetry = await reqConfig.onRefreshToken()
          if (shouldRetry) {
            return this.axios(reqConfig)
          }
        }

        return Promise.reject(error)
      },
    )
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
