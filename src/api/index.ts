import { AxiosRequestConfig } from 'axios'
import Request from './request'

const request = new Request({
  baseURL: 'baidu.com',
  timeout: 100000,
  interceptors: {
    requestInterceptors: (config: AxiosRequestConfig) => {
      // 携带token的拦截
      const token = 'token'
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
  },
})

export default request