import { axiosConfig } from '@/configs'
import { isDev } from '@/utils/env'
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { ApiError } from './error'

export type ApiClientConfig = AxiosRequestConfig & {
  onRefreshToken?: () => Promise<boolean>
  onPreRequest?: () => Promise<boolean>
}

export class ApiClient {
  private http: AxiosInstance

  constructor(config?: ApiClientConfig) {
    this.http = axios.create({
      ...axiosConfig,
      ...config,
      headers: {
        ...axiosConfig.headers,
        ...config?.headers,
      } as AxiosHeaders,
    })

    this.http.interceptors.request.use(
      async (reqConfig) => {
        const shouldProceed = await (reqConfig as ApiClientConfig).onPreRequest?.()

        if (shouldProceed === false) {
          return Promise.reject(new AxiosError('Request Cancelled', '', reqConfig))
        }

        return reqConfig
      },
      (error) => Promise.reject(error),
    )

    this.http.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error instanceof AxiosError) {
          const reqConfig = error.config as ApiClientConfig

          if (reqConfig.onRefreshToken !== undefined && error?.response?.status === 401) {
            const shouldRetry = await reqConfig.onRefreshToken()
            if (shouldRetry) {
              return this.http(reqConfig)
            }
          }
        }

        return Promise.reject(error)
      },
    )
  }

  get<T = unknown, R = AxiosResponse<T, unknown>>(url: string): Promise<R> {
    return this.handleRequest(() => this.http.get(url))
  }

  post<T = unknown, R = AxiosResponse<T, unknown>, D = unknown>(url: string, data?: D): Promise<R> {
    return this.handleRequest(() => this.http.post(url, data))
  }

  put<T = unknown, R = AxiosResponse<T, unknown>, D = unknown>(url: string, data?: D): Promise<R> {
    return this.handleRequest(() => this.http.put(url, data))
  }

  patch<T = unknown, R = AxiosResponse<T, unknown>, D = unknown>(
    url: string,
    data?: D,
  ): Promise<R> {
    return this.handleRequest(() => this.http.patch(url, data))
  }

  delete<T = unknown, R = AxiosResponse<T, unknown>>(url: string): Promise<R> {
    return this.handleRequest(() => this.http.delete(url))
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
