import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface RequestInterceptors<T = AxiosResponse> {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: unknown) => unknown
  // 响应拦截
  responseInterceptors?: <T>(config: T) => T
  responseInterceptorsCatch?: (err: unknown) => unknown
}
// 自定义传入的参数
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}
