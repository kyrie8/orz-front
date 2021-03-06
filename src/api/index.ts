import { AxiosRequestConfig } from 'axios'
import Request from './request'
import local from '@/utils/storage'

const request = new Request({
  baseURL: 'http://42.193.137.216:3000/',
  timeout: 100000,
  interceptors: {
    requestInterceptors: (config: AxiosRequestConfig) => {
      // 携带token的拦截
      const { token } = local.getStorage('user')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
  },
})

export default request
